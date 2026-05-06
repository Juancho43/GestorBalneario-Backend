import {Inject, Injectable, Logger} from '@nestjs/common';
import {DeleteReservation} from '../../../../core/Reservation/Application/UseCase/CRUD/DeleteReservation';
import {DeleteCommand} from '../../../../core/common/Application/DeleteCommand';

@Injectable()
export class DeleteReservationService {
  private logger = new Logger(DeleteReservationService.name);
  constructor(
    @Inject('DELETE_RESERVATION_USECASE') private useCase: DeleteReservation,
  ) {}

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
