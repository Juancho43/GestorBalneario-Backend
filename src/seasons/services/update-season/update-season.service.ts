import {Inject, Injectable, Logger} from '@nestjs/common';
import {UpdateSeason} from '../../../../core/Season/Application/UseCase/CRUD/UpdateSeason';
import {UpdateSeasonCommand} from '../../../../core/Season/Application/Commads/UpdateSeasonCommand';
import {SEASON_TOKEN} from '../../SEASON_TOKEN';

@Injectable()
export class UpdateSeasonService {
  private logger = new Logger(UpdateSeasonService.name);

  constructor(
    @Inject(SEASON_TOKEN.USECASE.UPDATE_SEASON)
    private useCase: UpdateSeason,
  ) {}

  async execute(command: UpdateSeasonCommand) {
    try {
      this.logger.debug('Executing UpdateSeasonService', command);
      return await this.useCase.execute(command);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
