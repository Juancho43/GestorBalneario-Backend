import {Inject, Injectable, Logger} from '@nestjs/common';
import {CreateServiceCommand} from '../../../../core/Service/Application/Commands/CreateServiceCommand';
import {CreateService} from '../../../../core/Service/Application/UseCase/CRUD/CreateService';
import {SERVICE_TOKEN} from '../../SERVICE_TOKEN';

@Injectable()
export class CreateServiceService {
  private logger = new Logger(CreateServiceService.name);

  constructor(
    @Inject(SERVICE_TOKEN.USECASE.CREATE_SERVICE)
    private useCase: CreateService,
  ) {}

  async execute(command: CreateServiceCommand) {
    try {
      this.logger.debug('Creating a service', command);
      return await this.useCase.execute(command);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
