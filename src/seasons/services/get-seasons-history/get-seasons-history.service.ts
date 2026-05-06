import {Inject, Injectable, Logger} from '@nestjs/common';
import {GetSeasonsHistory} from '../../../../core/Season/Application/UseCase/GetSeasonsHistory';
import {GetSeasonsHistoryQuery} from '../../../../core/Season/Application/Queries/GetSeasonsHistoryQuery';
import {SEASON_TOKEN} from "../../SEASON_TOKEN";

@Injectable()
export class GetSeasonsHistoryService {
  private logger = new Logger(GetSeasonsHistoryService.name);

  constructor(
      @Inject(SEASON_TOKEN.USECASE.GET_HISTORY)
      private useCase: GetSeasonsHistory
  ) {

  }

  async execute(query: GetSeasonsHistoryQuery) {
    try {
      this.logger.debug('Executing GetSeasonsHistoryService');
      return await this.useCase.execute(query);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
