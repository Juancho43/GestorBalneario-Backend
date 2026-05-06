import {Inject, Injectable, Logger} from '@nestjs/common';
import {GetShadowHistory} from '../../../../core/Shadow/Application/UseCase/GetShadowHistory';
import {GetShadowHistoryQuery} from '../../../../core/Shadow/Application/Queries/GetShadowHistoryQuery';
import {SHADOW_TOKEN} from '../../SHADOW_TOKEN';

@Injectable()
export class GetShadowHistoryService {
  private readonly logger = new Logger(GetShadowHistoryService.name);
  constructor(
    @Inject(SHADOW_TOKEN.USECASE.GET_SHADOW_DETAILS)
    private useCase: GetShadowHistory,
  ) {}
  execute(query: GetShadowHistoryQuery) {
    try {
      this.logger.debug('GetShadowHistoryService.execute', query);
      return this.useCase.execute(query);
    } catch (e) {
      this.logger.error(e.message);
      throw e;
    }
  }
}
