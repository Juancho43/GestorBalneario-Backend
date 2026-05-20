import {Inject, Injectable, Logger} from '@nestjs/common';
import {GetActiveReservations} from '../../../../core/Reservation/Application/UseCase/GetActiveReservations';
import {RESERVATION_TOKEN} from 'src/reservation/RESERVATION_TOKEN';
import {PaginatedQuery} from "../../../../core/common/Application/PaginatedQuery";

@Injectable()
export class GetActiveReservationsService {
  private logger = new Logger(GetActiveReservationsService.name);
  constructor(
    @Inject(RESERVATION_TOKEN.USECASE.GET_CURRENT)
    private useCase: GetActiveReservations,
  ) {}

  async execute(query: PaginatedQuery) {
    try {
      this.logger.debug(`Executing GetActiveReservationsService`);
      return await this.useCase.execute(query)
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
