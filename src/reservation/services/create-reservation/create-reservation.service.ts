import {Inject, Injectable, Logger} from '@nestjs/common';
import {CreateReservation} from '../../../../core/Reservation/Application/UseCase/CRUD/CreateReservation';
import {CreateReservationCommand} from '../../../../core/Reservation/Application/Commands/CreateReservationCommand';

@Injectable()
export class CreateReservationService {
  private logger = new Logger(CreateReservationService.name);
  constructor(
    @Inject('CREATE_RESERVATION_USECASE') private useCase: CreateReservation,
  ) {}

  async execute(command: CreateReservationCommand) {
    try {
      this.logger.debug('Creating a reservation', command);
      return await this.useCase.execute(command);
    } catch (error) {
      this.logger.error('Error creating reservation:', error);
      throw error;
    }
  }
}
