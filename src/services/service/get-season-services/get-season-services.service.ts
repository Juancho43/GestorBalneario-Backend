import {Inject, Injectable, Logger} from '@nestjs/common';
import {GetSeasonEntityQuery} from '../../../../core/Service/Application/Queries/GetSeasonEntityQuery';
import {GetSeasonServices} from '../../../../core/Service/Application/UseCase/GetSeasonServices';
import {SERVICE_TOKEN} from '../../SERVICE_TOKEN';

@Injectable()
export class GetSeasonServicesService {
  private logger = new Logger(GetSeasonServicesService.name);

  constructor(
    @Inject(SERVICE_TOKEN.USECASE.GET_SEASON_SERVICE)
    private useCase: GetSeasonServices,
  ) {}

  async execute(query: GetSeasonEntityQuery) {
    try {
      this.logger.debug('Executing GetSeasonServicesService', query);
      return this.useCase.execute(query);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
