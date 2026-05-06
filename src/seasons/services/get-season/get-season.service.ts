import {Inject, Injectable, Logger} from '@nestjs/common';
import {GetSeason} from '../../../../core/Season/Application/UseCase/CRUD/GetSeason';
import {GetByIdQuery} from '../../../../core/common/Application/GetByIdQuery';
import {SEASON_TOKEN} from '../../SEASON_TOKEN';

@Injectable()
export class GetSeasonService {
  private readonly logger = new Logger(GetSeasonService.name);

  constructor(
    @Inject(SEASON_TOKEN.USECASE.GET_SEASON) private useCase: GetSeason,
  ) {}

  async execute(command: GetByIdQuery) {
    try {
      this.logger.debug('Getting a season', command);
      return await this.useCase.execute(command);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
