import {Inject, Injectable, Logger} from '@nestjs/common';
import {SetActiveSeason} from '../../../../core/Season/Application/UseCase/SetActiveSeason';
import {SetActiveSeasonCommand} from '../../../../core/Season/Application/Commads/SetActiveSeasonCommand';
import {GetActiveSeasonService} from '../get-active-season/get-active-season.service';
import {SEASON_TOKEN} from '../../SEASON_TOKEN';

@Injectable()
export class SetActiveSeasonService {
  private logger = new Logger(SetActiveSeasonService.name);

  constructor(
    @Inject(SEASON_TOKEN.USECASE.SET_ACTIVE)
    private useCase: SetActiveSeason,
    @Inject() private getActive: GetActiveSeasonService,
  ) {}

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
