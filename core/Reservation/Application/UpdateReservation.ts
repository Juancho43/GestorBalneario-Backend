import {IUseCase} from "../../common/Application/IUseCase";
import {UpdateReservationCommand} from "./DTO/UpdateReservationCommand";
import {Reservation} from "../Model/Reservation";
import {GetClientDAO} from "../../Client/Model/DAO/GetClientDAO";
import {GetShadowDAO} from "../../Shadow/Model/DAO/GetShadowDAO";
import {Booking} from "../Model/Booking";
import {UpdateReservationDAO} from "../Model/DAO/UpdateReservationDAO";
import {UUID} from "../../common/Model/UUID";
import {Timestamps} from "../../common/Model/Timestamps";
import {SoftDelete} from "../../common/Model/SoftDelete";

export class UpdateReservation implements IUseCase<UpdateReservationCommand, Reservation>{
    constructor(private dao: UpdateReservationDAO, private getClient: GetClientDAO, private getShadow: GetShadowDAO) {
    }
    async execute(request: UpdateReservationCommand): Promise<Reservation> {
        const client = await this.getClient.get(request.data.clientId);
        const shadow = await this.getShadow.get(request.data.shadowId);
        if(!shadow){
            throw new Error('Shadow does not exist');
        }
        if(!client){
            throw new Error('Client does not exist');
        }

        const reservation = Reservation.create(
            UUID.restore(request.id),
            UUID.restore(request.data.clientId),
            UUID.restore(request.data.shadowId),
            Booking.create(new Date(request.data.checkIn),new Date(request.data.checkOut)),
            request.data.price,
            Timestamps.restore(new Date(request.createdAt), new Date()).update(),
            SoftDelete.empty()
        )
        await this.dao.update(reservation);
        return reservation;

    }


}