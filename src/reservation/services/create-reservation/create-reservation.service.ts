import {Inject, Injectable} from '@nestjs/common';
import {ClientNewReservation} from "../../../../core/Reservation/Application/ClientNewReservation";
import type {CreateReservationDAO} from "../../../../core/Reservation/Model/DAO/CreateReservationDAO";
import type {GetShadowDAO} from "../../../../core/Shadow/Model/DAO/GetShadowDAO";
import type {GetClientDAO} from "../../../../core/Client/Model/DAO/GetClientDAO";
import {CreateReservationCommand} from "../../../../core/Reservation/Application/DTO/CreateReservationCommand";
import {ReservationResponse} from "../../../../core/Reservation/Application/DTO/ReservationResponse";
import type {GetReservationsByShadowIdDAO} from "../../../../core/Reservation/Model/DAO/GetReservationsByShadowIdDAO";

@Injectable()
export class CreateReservationService {
    private useCase: ClientNewReservation;

    constructor(@Inject('CREATE_RESERVATION_DAO') implementation: CreateReservationDAO,
                @Inject('GET_SHADOW_INTERFACE') shadow: GetShadowDAO,
                @Inject('GET_CLIENT_INTERFACE') client: GetClientDAO,
                @Inject('GET_RESERVATIONS_BY_SHADOW_INTERFACE') getReservations: GetReservationsByShadowIdDAO
    ) {
        this.useCase = new ClientNewReservation(implementation,getReservations,shadow,client);
    }

    async execute(command: CreateReservationCommand) {
        try {
            return ReservationResponse.create(await this.useCase.execute(command));
        }catch (error) {
            console.error('Error creating reservation:', error);
            throw error;
        }
    }
}
