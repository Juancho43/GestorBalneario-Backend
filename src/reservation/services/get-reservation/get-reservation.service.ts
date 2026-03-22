import {Inject, Injectable} from '@nestjs/common';
import {GetReservation} from "../../../../core/Reservation/Application/GetReservation";
import type {GetReservationDAO} from "../../../../core/Reservation/Model/DAO/GetReservationDAO";
import {ReservationResponse} from "../../../../core/Reservation/Application/DTO/ReservationResponse";
import {GetReservationQuery} from "../../../../core/Reservation/Application/DTO/GetReservationQuery";
import {GetReservationWithClient} from "../../../../core/Reservation/Application/GetReservationWithClient";
import type {GetReservationWithClientDAO} from "../../../../core/Reservation/Model/DAO/GetReservationWithClientDAO";

@Injectable()
export class GetReservationService {

    private useCase: GetReservationWithClient;

    constructor(@Inject('GET_RESERVATION_CLIENT_DAO') implementation: GetReservationWithClientDAO) {
        this.useCase = new GetReservationWithClient(implementation);
    }

    async execute(query: GetReservationQuery){
        try {
            return await this.useCase.execute(query);
        }catch (error) {
            console.error('Service error:', error);
            throw error;
        }
    }
}

