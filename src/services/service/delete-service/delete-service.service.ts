import {Inject, Injectable, Logger} from '@nestjs/common';
import {DeleteService} from '../../../../core/Service/Application/UseCase/CRUD/DeleteService';
import {DeleteCommand} from '../../../../core/common/Application/DeleteCommand';
import {SERVICE_TOKEN} from '../../SERVICE_TOKEN';

@Injectable()
export class DeleteServiceService {
  private logger = new Logger(DeleteServiceService.name);

  constructor(
    @Inject(SERVICE_TOKEN.USECASE.DELETE_SERVICE)
    private useCase: DeleteService,
  ) {}

  execute(command: DeleteCommand) {
    try {
      this.logger.debug('Executing DeleteServiceService', command);
      return this.useCase.execute(command);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
