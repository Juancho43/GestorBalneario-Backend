import { Inject, Injectable, Logger } from '@nestjs/common';
import { GetSeasonServicesQuery } from '../../../../core/Service/Application/Queries/GetSeasonServicesQuery';
import { GetSeasonServices } from '../../../../core/Service/Application/UseCase/GetSeasonServices';
import type { SeasonServiceDAO } from '../../../../core/Service/Application/Interfaces/SeasonServiceDAO';

@Injectable()
export class GetSeasonServicesService {
  private logger = new Logger(GetSeasonServicesService.name);
  private useCase: GetSeasonServices;

  constructor(@Inject('GET_SEASON_SERVICES') dao: SeasonServiceDAO) {
    this.useCase = new GetSeasonServices(dao);
  }

  execute(query: GetSeasonServicesQuery) {
    try {
      this.logger.debug('Executing GetSeasonServicesService');
      return this.useCase.execute(query);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
