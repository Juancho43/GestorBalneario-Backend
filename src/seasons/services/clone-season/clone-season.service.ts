import { Inject, Injectable, Logger } from '@nestjs/common';
import { CloneSeason } from '../../../../core/Season/Application/UseCase/CloneSeason';
import type { CloneSeasonDAO } from '../../../../core/Season/Application/Interfaces/CloneSeasonDAO';
import type { GetSeasonShadowsServicesDAO } from '../../../../core/Season/Application/Interfaces/GetSeasonShadowsServicesDAO';
import { CloneSeasonCommand } from '../../../../core/Season/Application/Commads/CloneSeasonCommand';

@Injectable()
export class CloneSeasonService {
  private logger = new Logger(CloneSeasonService.name);
  private useCase: CloneSeason;

  constructor(
    @Inject('CLONE_SEASON') cloneSeason: CloneSeasonDAO,
    @Inject('GET_SEASON_DATA') seasonData: GetSeasonShadowsServicesDAO,
  ) {
    this.useCase = new CloneSeason(cloneSeason, seasonData);
  }

  execute(command: CloneSeasonCommand) {
    try {
      this.logger.debug('Executing CloneSeasonService', command);
      return this.useCase.execute(command);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
