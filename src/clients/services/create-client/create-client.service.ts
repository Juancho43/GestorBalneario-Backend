import {Inject, Injectable, Logger} from '@nestjs/common';
import {CreateClientCommand} from '../../../../core/Client/Application/Commands/CreateClientCommand';
import {CreateClient} from '../../../../core/Client/Application/UseCase/CRUD/CreateClient';
import {CLIENT_TOKEN} from '../../CLIENT_TOKEN';

@Injectable()
export class CreateClientService {
  private logger = new Logger(CreateClientService.name);
  constructor(
    @Inject(CLIENT_TOKEN.USECASE.CREATE_CLIENT) private useCase: CreateClient,
  ) {}

  async execute(command: CreateClientCommand) {
    try {
      this.logger.debug('Creating client command', command);
      return await this.useCase.execute(command);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
