import {Inject, Injectable, Logger} from '@nestjs/common';
import {UpdateReservation} from '../../../../core/Reservation/Application/UseCase/CRUD/UpdateReservation';
import {UpdateReservationCommand} from '../../../../core/Reservation/Application/Commands/UpdateReservationCommand';

@Injectable()
export class EditReservationService {
  private logger = new Logger(EditReservationService.name);
  constructor(
    @Inject('UPDATE_RESERVATION_USECASE') private useCase: UpdateReservation,
  ) {}

  async execute(command: UpdateReservationCommand) {
    try {
      this.logger.debug(
        'Executing EditReservationService with command: ',
        command,
      );
      return await this.useCase.execute(command);
    } catch (error) {
      this.logger.error('Error updating reservation:', error);
      throw error;
    }
  }
}
