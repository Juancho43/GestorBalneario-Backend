import {IUseCase} from "../../common/Application/IUseCase";
import {CreateReservationCommand} from "./DTO/CreateReservationCommand";
import {Reservation} from "../Model/Reservation";
import type {CreateReservationDAO} from "../Model/DAO/CreateReservationDAO";
import {GetClientDAO} from "../../Client/Model/DAO/GetClientDAO";
import {GetShadow} from "../../Shadow/Model/GetShadow";
import {Booking} from "../Model/Booking";
import {randomUUID} from "node:crypto";

export class CreateReservation implements IUseCase<CreateReservationCommand, Reservation>{
    constructor(private dao: CreateReservationDAO, private getClient: GetClientDAO, private getShadow: GetShadow) {
    }
    async execute(request: CreateReservationCommand): Promise<Reservation> {
        const client = await this.getClient.get(request.clientId);
        const shadow = await this.getShadow.get(request.shadowId);
        console.log(request)
        if(!shadow){
            throw new Error('Shadow does not exist');
        }
        if (shadow.state.state ==='unavailable'){
            throw new Error('Shadow is unavailable');
        }
        if(!client) {
            throw new Error('Client does not exist');
        }

        const reservation = Reservation.create(
            randomUUID().toString(),
            client,
            shadow,
            Booking.create(new Date(request.checkIn),new Date(request.checkOut))
        )
        await this.dao.save(reservation);
        return reservation;

    }

}