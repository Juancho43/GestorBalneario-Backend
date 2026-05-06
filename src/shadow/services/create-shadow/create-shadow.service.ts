import {Inject, Injectable, Logger} from '@nestjs/common';
import {CreateShadow} from '../../../../core/Shadow/Application/UseCase/CRUD/CreateShadow';
import {CreateShadowCommand} from '../../../../core/Shadow/Application/Command/CreateShadowCommand';
import {SHADOW_TOKEN} from '../../SHADOW_TOKEN';

@Injectable()
export class CreateShadowService {
  private logger = new Logger(CreateShadowService.name);
  constructor(
    @Inject(SHADOW_TOKEN.USECASE.CREATE_SHADOW) private useCase: CreateShadow,
  ) {}

  async execute(command: CreateShadowCommand) {
    try {
      this.logger.debug('Creating a shadow', command);
      return await this.useCase.execute(command);
    } catch (error) {
      this.logger.error('Error creating shadow:', error);
      throw error;
    }
  }
}
