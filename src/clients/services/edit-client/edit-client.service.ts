import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientResponse } from '../../../../core/Client/Application/DTO/ClientResponse';
import { UpdateClient } from '../../../../core/Client/Application/UseCase/CRUD/UpdateClient';
import type { UpdateClientDAO } from '../../../../core/Client/Model/DAO/UpdateClientDAO';
import { UpdateClientCommand } from '../../../../core/Client/Application/Commands/UpdateClientCommand';
import type { GetClientDAO } from '../../../../core/Client/Model/DAO/GetClientDAO';

@Injectable()
export class EditClientService {
  private useCase: UpdateClient;
  private logger = new Logger(EditClientService.name);
  constructor(
    @Inject('GET_CLIENT_INTERFACE') get: GetClientDAO,
    @Inject('UPDATE_CLIENT_INTERFACE') implementation: UpdateClientDAO,
  ) {
    this.useCase = new UpdateClient(implementation, get);
  }

  async execute(command: UpdateClientCommand) {
    try {
      this.logger.debug('Executing EditClientService with command', command);
      return ClientResponse.create(await this.useCase.execute(command));
    } catch (error) {
      this.logger.error('Error creating client:', error);
      throw error;
    }
  }
}
