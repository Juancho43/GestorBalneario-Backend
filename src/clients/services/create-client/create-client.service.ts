import { Inject, Injectable, Logger } from '@nestjs/common';
import type { SaveClientDAO } from '../../../../core/Client/Model/DAO/SaveClientDAO';
import { CreateClientCommand } from '../../../../core/Client/Application/Commands/CreateClientCommand';
import { ClientResponse } from '../../../../core/Client/Application/DTO/ClientResponse';
import { CreateClient } from '../../../../core/Client/Application/UseCase/CRUD/CreateClient';

@Injectable()
export class CreateClientService {
  private useCase: CreateClient;
  private logger = new Logger(CreateClientService.name);
  constructor(
    @Inject('CREATE_CLIENT_INTERFACE') implementation: SaveClientDAO,
  ) {
    this.useCase = new CreateClient(implementation);
  }

  async execute(command: CreateClientCommand) {
    try {
      this.logger.debug('Creating client command', command);
      return ClientResponse.create(await this.useCase.execute(command));
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
