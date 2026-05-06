import {Inject, Injectable, Logger} from '@nestjs/common';
import {UpdateService} from '../../../../core/Service/Application/UseCase/CRUD/UpdateService';
import {UpdateServiceCommand} from '../../../../core/Service/Application/Commands/UpdateServiceCommand';
import {SERVICE_TOKEN} from '../../SERVICE_TOKEN';

@Injectable()
export class UpdateServiceService {
  private logger = new Logger(UpdateServiceService.name);

  constructor(
    @Inject(SERVICE_TOKEN.USECASE.UPDATE_SERVICE)
    private useCase: UpdateService,
  ) {}

  execute(command: UpdateServiceCommand) {
    try {
      this.logger.debug('Executing UpdateServiceService', command);
      return this.useCase.execute(command);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
