import { Inject, Injectable, Logger } from '@nestjs/common';
import { DeleteReservation } from '../../../../core/Reservation/Application/UseCase/CRUD/DeleteReservation';
import { DeleteReservationCommand } from '../../../../core/Reservation/Application/Commands/DeleteReservationCommand';
import type { GetReservationDAO } from '../../../../core/Reservation/Model/DAO/GetReservationDAO';
import type { DeleteReservationDAO } from '../../../../core/Reservation/Model/DAO/DeleteReservationDAO';
import { DeleteCommand } from '../../../../core/common/Application/DeleteCommand';

@Injectable()
export class DeleteReservationService {
  private useCase: DeleteReservation;
  private logger = new Logger(DeleteReservationService.name);
  constructor(
    @Inject('GET_RESERVATION_DAO') get: GetReservationDAO,
    @Inject('DELETE_RESERVATION_DAO') implementation: DeleteReservationDAO,
  ) {
    this.useCase = new DeleteReservation(implementation, get);
  }

  async execute(command: DeleteCommand) {
    try {
      this.logger.debug('Deleting Reservation', command);
      return await this.useCase.execute(command);
    } catch (error) {
      this.logger.error('Error deleting reservation:', error);
      throw error;
    }
  }
}
