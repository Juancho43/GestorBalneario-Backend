import {IUseCase} from "../../common/Application/IUseCase";
import {CreateReservationCommand} from "./DTO/CreateReservationCommand";
import {Reservation} from "../Model/Reservation";
import type {CreateReservationDAO} from "../Model/DAO/CreateReservationDAO";
import type {GetClientDAO} from "../../Client/Model/DAO/GetClientDAO";
import type {GetShadowDAO} from "../../Shadow/Model/DAO/GetShadowDAO";
import {Booking} from "../Model/Booking";
import {UUID} from "../../common/Model/UUID";
import {Timestamps} from "../../common/Model/Timestamps";
import {SoftDelete} from "../../common/Model/SoftDelete";
import {EventPublisher} from "../../common/Application/EventPublisher";
import {ReservationCreatedEvent} from "./Events/ReservationCreatedEvent";
import {GetServiceDAO} from "../../Service/Model/DAO/GetServiceDAO";

export class CreateReservation implements IUseCase<CreateReservationCommand, Reservation>{
    constructor(
        private dao: CreateReservationDAO,
        private getService: GetServiceDAO,
        private getShadow: GetShadowDAO,
        private getClient: GetClientDAO,
        private publisher: EventPublisher
    ) {
    }
    async execute(request: CreateReservationCommand): Promise<Reservation> {
        const [service, client, shadow] = await Promise.all([
            this.getService.get(request.serviceId),
            this.getClient.get(request.clientId),
            this.getShadow.get(request.shadowId)
            ]);

        if (!service){
            throw new Error("Service not found");
        }
        if (!client) {
            throw new Error("Client not found");
        }
        if (!shadow) {
            throw new Error("Shadow not found");
        }
        const booking =  Booking.create(new Date(request.checkIn),new Date(request.checkOut));
        if(!shadow.canBeReserved(booking)) throw new Error("Shadow is not available for the selected dates");
        const reservation = Reservation.create(
            UUID.create(),
            UUID.restore(request.clientId),
            UUID.restore(request.shadowId),
            booking,
            Timestamps.create(),
            SoftDelete.empty()
        );

        await this.dao.save(reservation);
        this.publisher.publish(new ReservationCreatedEvent(
            reservation.id.value,
            request.clientId,
            request.serviceId,
            request.price,
            new Date(),
            service.name.getValue(),
        ));
        return reservation;
    }
}