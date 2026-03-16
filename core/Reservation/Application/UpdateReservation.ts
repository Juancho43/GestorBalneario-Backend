import {IUseCase} from "../../common/Application/IUseCase";
import {EditReservationCommand} from "./DTO/EditReservationCommand";
import {Reservation} from "../Model/Reservation";
import {GetClientDAO} from "../../Client/Model/DAO/GetClientDAO";
import {GetShadow} from "../../Shadow/Model/GetShadow";
import {Booking} from "../Model/Booking";
import {UpdateReservationDAO} from "../Model/DAO/UpdateReservationDAO";

export class UpdateReservation implements IUseCase<EditReservationCommand, Reservation>{
    constructor(private dao: UpdateReservationDAO, private getClient: GetClientDAO, private getShadow: GetShadow) {
    }
    async execute(request: EditReservationCommand): Promise<Reservation> {
        const client = await this.getClient.get(request.data.clientId);
        const shadow = await this.getShadow.get(request.data.shadowId);
        if(!shadow){
            throw new Error('Shadow does not exist');
        }
        if(!client){
            throw new Error('Client does not exist');
        }

        const reservation = Reservation.create(
            request.id,
            client,
            shadow,
            Booking.create(new Date(request.data.checkIn),new Date(request.data.checkOut))
        )
        await this.dao.update(reservation);
        return reservation;

    }


}