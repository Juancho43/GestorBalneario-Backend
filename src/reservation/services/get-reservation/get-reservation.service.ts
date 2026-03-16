import {Inject, Injectable} from '@nestjs/common';
import {GetReservation} from "../../../../core/Reservation/Application/GetReservation";
import type {GetReservationDAO} from "../../../../core/Reservation/Model/DAO/GetReservationDAO";
import {ReservationResponse} from "../../../../core/Reservation/Application/DTO/ReservationResponse";
import {GetReservationQuery} from "../../../../core/Reservation/Application/DTO/GetReservationQuery";

@Injectable()
export class GetReservationService {

    private useCase: GetReservation;

    constructor(@Inject('GET_RESERVATION_DAO') implementation: GetReservationDAO) {
        this.useCase = new GetReservation(implementation);
    }

    async execute(query: GetReservationQuery){
        try {
            return ReservationResponse.create(await this.useCase.execute(query));
        }catch (error) {
            console.error('Error getting reservation:', error);
            throw error;
        }
    }
}

