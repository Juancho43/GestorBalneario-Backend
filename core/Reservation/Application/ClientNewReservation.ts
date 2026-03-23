import {IUseCase} from "../../common/Application/IUseCase";
import {CreateReservationCommand} from "./DTO/CreateReservationCommand";
import {Reservation} from "../Model/Reservation";
import type {CreateReservationDAO} from "../Model/DAO/CreateReservationDAO";
import type {GetClientDAO} from "../../Client/Model/DAO/GetClientDAO";
import type {GetShadowDAO} from "../../Shadow/Model/DAO/GetShadowDAO";
import {Booking} from "../Model/Booking";
import {UUID} from "../../common/Model/UUID";
import {GetReservationsByShadowIdDAO} from "../Model/DAO/GetReservationsByShadowIdDAO";
import {Timestamps} from "../../common/Model/Timestamps";
import {SoftDelete} from "../../common/Model/SoftDelete";

export class ClientNewReservation implements IUseCase<CreateReservationCommand, Reservation>{
    constructor(
        private dao: CreateReservationDAO,
        private getReservations: GetReservationsByShadowIdDAO,
        private getShadow: GetShadowDAO,
        private getClient: GetClientDAO
    ) {
    }
    async execute(request: CreateReservationCommand): Promise<Reservation> {
        const clientId = UUID.restore(request.clientId);
        const shadowId = UUID.restore(request.shadowId);
        const booking =  Booking.create(new Date(request.checkIn),new Date(request.checkOut));
        const client = await this.getClient.get(request.clientId);
        if (!client) {
            throw new Error("Client not found");
        }
        const shadow = await this.getShadow.get(request.shadowId);
        if (!shadow) {
            throw new Error("Shadow not found");
        }
        const reservations = await this.getReservations.get(request.shadowId);
        if(!shadow.canBeReserved(booking, reservations)) throw new Error("Shadow is not available for the selected dates");


        const reservation = Reservation.create(
            UUID.create(),
            clientId,
            shadowId,
            booking,
            request.price,
            Timestamps.create(),
            SoftDelete.empty()
        );

        await this.dao.save(reservation);
        return reservation;
    }
}