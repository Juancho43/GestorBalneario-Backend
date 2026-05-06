import {Inject, Injectable, Logger} from '@nestjs/common';
import {GetReservationDetail} from '../../../../core/Reservation/Application/UseCase/GetReservationDetail';
import {GetReservationQuery} from '../../../../core/Reservation/Application/Queries/GetReservationQuery';
import {RESERVATION_TOKEN} from '../../RESERVATION_TOKEN';

@Injectable()
export class GetReservationDetailService {
  private logger = new Logger(GetReservationDetailService.name);

  constructor(
    @Inject(RESERVATION_TOKEN.USECASE.GET_DETAILS)
    private useCase: GetReservationDetail,
  ) {}
  async execute(id: string) {
    try {
      this.logger.debug(`Executing GetReservationDetailService with id: ${id}`);
      return await this.useCase.execute(new GetReservationQuery(id));
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
