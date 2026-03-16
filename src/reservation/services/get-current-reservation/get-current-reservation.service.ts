import {Inject, Injectable} from '@nestjs/common';
import {GetReservation} from "../../../../core/Reservation/Application/GetReservation";
import {GetReservationQuery} from "../../../../core/Reservation/Application/DTO/GetReservationQuery";
import {ReservationResponse} from "../../../../core/Reservation/Application/DTO/ReservationResponse";
import {GetCurrentReservations} from "../../../../core/Reservation/Application/GetCurrentReservations";
import type {GetCurrentReservationsDAO} from "../../../../core/Reservation/Model/DAO/GetCurrentReservationsDAO";
import {GetCurrentReservationsQuery} from "../../../../core/Reservation/Application/DTO/GetCurrentReservationsQuery";

@Injectable()
export class GetCurrentReservationService {
    private useCase: GetCurrentReservations;

    constructor(@Inject('GET_RESERVATIONS_DAO') implementation: GetCurrentReservationsDAO) {
        this.useCase = new GetCurrentReservations(implementation);
    }

    async execute(query: GetCurrentReservationsQuery) {
        try {
            return ReservationResponse.createList(await this.useCase.execute(query));
        } catch (error) {
            console.error('Error getting reservations:', error);
            throw error;
        }

    }
}
