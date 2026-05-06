import {Inject, Injectable, Logger} from '@nestjs/common';
import {GetActiveReservations} from '../../../../core/Reservation/Application/UseCase/GetActiveReservations';
import {RESERVATION_TOKEN} from 'src/reservation/RESERVATION_TOKEN';

@Injectable()
export class GetActiveReservationsService {
  private logger = new Logger(GetActiveReservationsService.name);
  constructor(
    @Inject(RESERVATION_TOKEN.USECASE.GET_CURRENT)
    private useCase: GetActiveReservations,
  ) {}

  async execute() {
    try {
      this.logger.debug(`Executing GetActiveReservationsService`);
      return await this.useCase.execute(null)
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
