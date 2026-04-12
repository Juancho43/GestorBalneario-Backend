import { Inject, Injectable, Logger } from '@nestjs/common';
import { DeleteShadow } from '../../../../core/Shadow/Application/UseCase/CRUD/DeleteShadow';
import type { DeleteShadowDAO } from '../../../../core/Shadow/Model/DAO/DeleteShadowDAO';
import { DeleteCommand } from '../../../../core/common/Application/DeleteCommand';
import type { GetShadowDAO } from '../../../../core/Shadow/Model/DAO/GetShadowDAO';

@Injectable()
export class DeleteShadowService {
  private useCase: DeleteShadow;
  private logger = new Logger(DeleteShadowService.name);
  constructor(
    @Inject('GET_SHADOW_INTERFACE') get: GetShadowDAO,
    @Inject('DELETE_SHADOW_INTERFACE') implementation: DeleteShadowDAO,
  ) {
    this.useCase = new DeleteShadow(implementation, get);
  }

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
