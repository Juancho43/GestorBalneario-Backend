import {Inject, Injectable} from '@nestjs/common';
import {CreateShadowCommand} from "../../../../core/Shadow/Application/DTO/CreateShadowCommand";
import {ShadowResponse} from "../../../../core/Shadow/Application/DTO/ShadowResponse";
import {CreateReservation} from "../../../../core/Reservation/Application/CreateReservation";
import type {CreateReservationDAO} from "../../../../core/Reservation/Model/DAO/CreateReservationDAO";
import type {GetShadow} from "../../../../core/Shadow/Model/GetShadow";
import type {GetClientDAO} from "../../../../core/Client/Model/DAO/GetClientDAO";
import {CreateReservationCommand} from "../../../../core/Reservation/Application/DTO/CreateReservationCommand";
import {ReservationResponse} from "../../../../core/Reservation/Application/DTO/ReservationResponse";

@Injectable()
export class CreateReservationService {
    private useCase: CreateReservation;

    constructor(@Inject('CREATE_RESERVATION_DAO') implementation: CreateReservationDAO,
                @Inject('GET_SHADOW_INTERFACE') shadow: GetShadow,
                @Inject('GET_CLIENT_INTERFACE') client: GetClientDAO
    ) {
        this.useCase = new CreateReservation(implementation,client,shadow);
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
