import {Inject, Injectable} from '@nestjs/common';
import {ReservationResponse} from "../../../../core/Reservation/Application/DTO/ReservationResponse";
import {UpdateReservation} from "../../../../core/Reservation/Application/UpdateReservation";
import type {UpdateReservationDAO} from "../../../../core/Reservation/Model/DAO/UpdateReservationDAO";
import type {GetShadowDAO} from "../../../../core/Shadow/Model/DAO/GetShadowDAO";
import type {GetClientDAO} from "../../../../core/Client/Model/DAO/GetClientDAO";
import {UpdateReservationCommand} from "../../../../core/Reservation/Application/DTO/UpdateReservationCommand";

@Injectable()
export class EditReservationService {

    private useCase: UpdateReservation;

    constructor(
        @Inject('UPDATE_RESERVATION_DAO') implementation: UpdateReservationDAO,
        @Inject('GET_SHADOW_INTERFACE') shadow: GetShadowDAO,
        @Inject('GET_CLIENT_INTERFACE') client: GetClientDAO
    ) {
        this.useCase = new UpdateReservation(implementation,client,shadow);
    }

    async execute(command: UpdateReservationCommand){
        try {
            return ReservationResponse.create(await this.useCase.execute(command));
        }catch (error) {
            console.error('Error updating reservation:', error);
            throw error;
        }
    }
}

