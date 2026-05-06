import {Inject, Injectable, Logger} from '@nestjs/common';
import {GetShadowMap} from '../../../../core/Shadow/Application/UseCase/GetShadowMap';
import {GetActiveSeasonService} from '../../../seasons/services/get-active-season/get-active-season.service';
import {SHADOW_TOKEN} from '../../SHADOW_TOKEN';

@Injectable()
export class GetShadowMapService {
  private logger = new Logger(GetShadowMapService.name);

  constructor(
    @Inject(SHADOW_TOKEN.USECASE.GET_SHADOW_MAP) private useCase: GetShadowMap,
    @Inject() private seasons: GetActiveSeasonService,
  ) {}

  async execute(seasonId: string) {
    try {
      this.logger.debug('Executing GetShadowMapService');
      let id = seasonId;
      if (id == 'none') {
        id = (await this.seasons.get()).id.value;
      }
      return await this.useCase.execute(id);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
