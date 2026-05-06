import {Inject, Injectable, Logger} from '@nestjs/common';
import {CreateSeason} from '../../../../core/Season/Application/UseCase/CRUD/CreateSeason';
import {CreateSeasonCommand} from '../../../../core/Season/Application/Commads/CreateSeasonCommand';
import {SEASON_TOKEN} from '../../SEASON_TOKEN';

@Injectable()
export class CreateSeasonService {
  private readonly logger = new Logger(CreateSeasonService.name);

  constructor(
    @Inject(SEASON_TOKEN.USECASE.CREATE_SEASON) private useCase: CreateSeason,
  ) {}

  async execute(command: CreateSeasonCommand) {
    try {
      this.logger.debug('Creating season', command);
      return await this.useCase.execute(command);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
