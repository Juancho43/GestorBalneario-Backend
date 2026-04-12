import { Inject, Injectable, Logger } from '@nestjs/common';
import { GetReservationQuery } from '../../../../core/Reservation/Application/Queries/GetReservationQuery';
import { GetReservation } from '../../../../core/Reservation/Application/UseCase/CRUD/GetReservation';
import type { GetReservationDAO } from '../../../../core/Reservation/Model/DAO/GetReservationDAO';

@Injectable()
export class GetReservationService {
  private useCase: GetReservation;
  private logger = new Logger(GetReservationService.name);
  constructor(
    @Inject('GET_RESERVATION_CLIENT_DAO')
    implementation: GetReservationDAO,
  ) {
    this.useCase = new GetReservation(implementation);
  }

  async execute(query: GetReservationQuery) {
    try {
      this.logger.debug('Getting reservation', query);
      return await this.useCase.execute(query);
    } catch (error) {
      this.logger.error('Service error:', error);
      throw error;
    }
  }
}
