import { Inject, Injectable, Logger } from '@nestjs/common';
import { UpdateShadow } from '../../../../core/Shadow/Application/UseCase/CRUD/UpdateShadow';
import { UpdateShadowCommand } from '../../../../core/Shadow/Application/Command/UpdateShadowCommand';
import { ShadowResponse } from '../../../../core/Shadow/Application/Response/ShadowResponse';
import type { UpdateShadowDAO } from '../../../../core/Shadow/Model/DAO/UpdateShadowDAO';
import { GetActiveSeasonService } from '../../../seasons/services/get-active-season/get-active-season.service';
import type { GetShadowDAO } from '../../../../core/Shadow/Model/DAO/GetShadowDAO';

@Injectable()
export class EditShadowService {
  private useCase: UpdateShadow;
  private logger = new Logger(EditShadowService.name);
  constructor(
    @Inject('GET_SHADOW_INTERFACE') get: GetShadowDAO,
    @Inject('UPDATE_SHADOW_INTERFACE') create: UpdateShadowDAO,
    @Inject() season: GetActiveSeasonService,
  ) {
    this.useCase = new UpdateShadow(create, get, season);
  }

  async execute(command: UpdateShadowCommand) {
    try {
      this.logger.debug('Updating shadow', command);
      return ShadowResponse.create(await this.useCase.execute(command));
    } catch (error) {
      this.logger.error('Error updating shadow:', error);
      throw error;
    }
  }
}
