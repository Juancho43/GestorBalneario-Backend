import {Inject, Injectable, Logger} from '@nestjs/common';
import {CloneSeason} from '../../../../core/Season/Application/UseCase/CloneSeason';
import {CloneSeasonCommand} from '../../../../core/Season/Application/Commads/CloneSeasonCommand';
import {SEASON_TOKEN} from "../../SEASON_TOKEN";

@Injectable()
export class CloneSeasonService {
  private logger = new Logger(CloneSeasonService.name);

  constructor(
      @Inject(SEASON_TOKEN.USECASE.CLONE_SEASON)
      private useCase: CloneSeason
  ) {
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
