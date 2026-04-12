import { Inject, Injectable, Logger } from '@nestjs/common';
import { ReservationResponse } from '../../../../core/Reservation/Application/DTO/ReservationResponse';
import { UpdateReservation } from '../../../../core/Reservation/Application/UseCase/CRUD/UpdateReservation';
import type { UpdateReservationDAO } from '../../../../core/Reservation/Model/DAO/UpdateReservationDAO';
import { UpdateReservationCommand } from '../../../../core/Reservation/Application/Commands/UpdateReservationCommand';
import type { GetReservationDAO } from '../../../../core/Reservation/Model/DAO/GetReservationDAO';
import type {GetShadowDAO} from "../../../../core/Shadow/Model/DAO/GetShadowDAO";

@Injectable()
export class EditReservationService {
  private useCase: UpdateReservation;
  private logger = new Logger(EditReservationService.name);
  constructor(

      @Inject('GET_SHADOW_DAO') getShadow: GetShadowDAO,
      @Inject('GET_RESERVATION_DAO') get: GetReservationDAO,
      @Inject('UPDATE_RESERVATION_DAO') implementation: UpdateReservationDAO,
  ) {
    this.useCase = new UpdateReservation(implementation, get,getShadow);
  }

  async execute(command: UpdateReservationCommand) {
    try {
      this.logger.debug(
        'Executing EditReservationService with command: ',
        command,
      );
      return ReservationResponse.create(await this.useCase.execute(command));
    } catch (error) {
      this.logger.error('Error updating reservation:', error);
      throw error;
    }
  }
}
