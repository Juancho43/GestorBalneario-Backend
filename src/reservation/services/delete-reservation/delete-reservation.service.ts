import {Inject, Injectable} from '@nestjs/common';
import type {DeleteShadowDAO} from "../../../../core/Shadow/Model/DAO/DeleteShadowDAO";
import {DeleteReservation} from "../../../../core/Reservation/Application/DeleteReservation";
import {DeleteReservationCommand} from "../../../../core/Reservation/Application/DTO/DeleteReservationCommand";

@Injectable()
export class DeleteReservationService {
    private useCase: DeleteReservation;

    constructor(@Inject('DELETE_RESERVATION_DAO') implementation: DeleteShadowDAO) {
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
