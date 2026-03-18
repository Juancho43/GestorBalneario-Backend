import {Inject, Injectable} from '@nestjs/common';
import type {GetActiveReservationsDAO} from "../../../../core/Reservation/Model/DAO/GetActiveReservationsDAO";
import {GetActiveReservations} from "../../../../core/Reservation/Application/GetActiveReservations";

@Injectable()
export class GetActiveReservationsService {
    private useCase: GetActiveReservations;
    constructor(@Inject('GET_ACTIVE_RESERVATIONS') private dao: GetActiveReservationsDAO ) {
        this.useCase = new GetActiveReservations(dao)
    }


   async execute() {
        return this.useCase.execute(null);
    }

}
