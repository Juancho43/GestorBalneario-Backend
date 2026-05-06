import {Inject, Injectable, Logger} from '@nestjs/common';
import {DeleteSeason} from '../../../../core/Season/Application/UseCase/CRUD/DeleteSeason';
import {DeleteCommand} from '../../../../core/common/Application/DeleteCommand';
import {SEASON_TOKEN} from '../../SEASON_TOKEN';

@Injectable()
export class DeleteSeasonService {
  private logger = new Logger(DeleteSeasonService.name);

  constructor(
    @Inject(SEASON_TOKEN.USECASE.DELETE_SEASON)
    private useCase: DeleteSeason,
  ) {}

  execute(command: DeleteCommand) {
    try {
      this.logger.debug('Executing DeleteSeasonService', command);
      return this.useCase.execute(command);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
