import {Inject, Injectable} from '@nestjs/common';
import type {DeleteShadowById} from "../../../../core/Shadow/Model/DeleteShadowById";
import {DeleteReservation} from "../../../../core/Reservation/Application/DeleteReservation";
import {DeleteReservationCommand} from "../../../../core/Reservation/Application/DTO/DeleteReservationCommand";

@Injectable()
export class DeleteReservationService {
    private useCase: DeleteReservation;

    constructor(@Inject('DELETE_RESERVATION_DAO') implementation: DeleteShadowById) {
        this.useCase = new DeleteReservation(implementation);
    }

    async execute(command: DeleteReservationCommand){
        try {
            return await this.useCase.execute(command);
        }catch (error) {
            console.error('Error deleting reservation:', error);
            throw error;
        }
    }
}
