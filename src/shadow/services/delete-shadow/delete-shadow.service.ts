import {Inject, Injectable, Logger} from '@nestjs/common';
import {DeleteShadow} from '../../../../core/Shadow/Application/UseCase/CRUD/DeleteShadow';
import {DeleteCommand} from '../../../../core/common/Application/DeleteCommand';
import {SHADOW_TOKEN} from '../../SHADOW_TOKEN';

@Injectable()
export class DeleteShadowService {
  private logger = new Logger(DeleteShadowService.name);
  constructor(
    @Inject(SHADOW_TOKEN.USECASE.DELETE_SHADOW) private useCase: DeleteShadow,
  ) {}

  async execute(command: DeleteCommand) {
    try {
      this.logger.debug('Deleting shadow', command);
      return await this.useCase.execute(command);
    } catch (error) {
      this.logger.error('Error deleting shadow:', error);
      throw error;
    }
  }
}
