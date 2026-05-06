import {Inject, Injectable, Logger} from '@nestjs/common';
import {GetShadow} from '../../../../core/Shadow/Application/UseCase/CRUD/GetShadow';
import {SHADOW_TOKEN} from '../../SHADOW_TOKEN';
import {GetByIdQuery} from '../../../../core/common/Application/GetByIdQuery';

@Injectable()
export class GetShadowService {
  private logger = new Logger(GetShadowService.name);
  constructor(
    @Inject(SHADOW_TOKEN.USECASE.GET_SHADOW) private useCase: GetShadow,
  ) {}

  async execute(command: GetByIdQuery) {
    try {
      this.logger.debug('Getting shadow by id', command);
      return await this.useCase.execute(command);
    } catch (error) {
      this.logger.error('Error getting shadow:', error);
      throw error;
    }
  }
}
