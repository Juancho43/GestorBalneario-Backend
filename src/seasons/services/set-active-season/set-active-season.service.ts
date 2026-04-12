import { Inject, Injectable, Logger } from '@nestjs/common';
import { SetActiveSeason } from '../../../../core/Season/Application/UseCase/SetActiveSeason';
import type { SetActiveSeasonDAO } from '../../../../core/Season/Application/Interfaces/SetActiveSeasonDAO';
import { SetActiveSeasonCommand } from '../../../../core/Season/Application/Commads/SetActiveSeasonCommand';
import { GetActiveSeason } from '../../../../core/Season/Application/UseCase/GetActiveSeason';
import { GetActiveSeasonService } from '../get-active-season/get-active-season.service';

@Injectable()
export class SetActiveSeasonService {
  private logger = new Logger(SetActiveSeasonService.name);
  private useCase: SetActiveSeason;

  constructor(
    @Inject('SET_ACTIVE') dao: SetActiveSeasonDAO,
    @Inject() private getActive: GetActiveSeasonService,
  ) {
    this.useCase = new SetActiveSeason(dao);
  }

  async execute(command: SetActiveSeasonCommand) {
    try {
      this.logger.debug('Executing SetActiveSeasonService', command);
      await this.useCase.execute(command);
      await this.getActive.execute();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
