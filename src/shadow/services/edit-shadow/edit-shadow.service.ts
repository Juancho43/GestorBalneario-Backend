import {Inject, Injectable, Logger} from '@nestjs/common';
import {UpdateShadow} from '../../../../core/Shadow/Application/UseCase/CRUD/UpdateShadow';
import {UpdateShadowCommand} from '../../../../core/Shadow/Application/Command/UpdateShadowCommand';
import {SHADOW_TOKEN} from '../../SHADOW_TOKEN';

@Injectable()
export class EditShadowService {
  private logger = new Logger(EditShadowService.name);
  constructor(
    @Inject(SHADOW_TOKEN.USECASE.UPDATE_SHADOW) private useCase: UpdateShadow,
  ) {}

  async execute(command: UpdateShadowCommand) {
    try {
      this.logger.debug('Updating shadow', command);
      return await this.useCase.execute(command);
    } catch (error) {
      this.logger.error('Error updating shadow:', error);
      throw error;
    }
  }
}
