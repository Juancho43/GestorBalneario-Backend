import {Inject, Injectable, Logger} from '@nestjs/common';
import {GetReservation} from '../../../../core/Reservation/Application/UseCase/CRUD/GetReservation';
import {RESERVATION_TOKEN} from '../../RESERVATION_TOKEN';
import {GetByIdQuery} from "../../../../core/common/Application/GetByIdQuery";

@Injectable()
export class GetReservationService {
  private logger = new Logger(GetReservationService.name);
  constructor(
    @Inject(RESERVATION_TOKEN.USECASE.GET_RESERVATION)
    private useCase: GetReservation,
  ) {}

  async execute(query: GetByIdQuery) {
    try {
      this.logger.debug('Getting reservation', query);
      return await this.useCase.execute(query);
    } catch (error) {
      this.logger.error('Service error:', error);
      throw error;
    }
  }
}
