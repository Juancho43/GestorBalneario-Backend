import { Inject, Injectable, Logger } from '@nestjs/common';
import { DeleteClient } from '../../../../core/Client/Application/UseCase/CRUD/DeleteClient';
import type { DeleteClientDAO } from '../../../../core/Client/Model/DAO/DeleteClientDAO';
import { DeleteCommand } from '../../../../core/common/Application/DeleteCommand';
import type { GetClientDAO } from '../../../../core/Client/Model/DAO/GetClientDAO';

@Injectable()
export class DeleteClientService {
  private useCase: DeleteClient;
  private logger = new Logger(DeleteClient.name);
  constructor(
    @Inject('GET_CLIENT_INTERFACE') get: GetClientDAO,
    @Inject('DELETE_CLIENT_INTERFACE') implementation: DeleteClientDAO,
  ) {
    this.useCase = new DeleteClient(implementation, get);
  }

  async execute(command: DeleteCommand) {
    try {
      this.logger.debug('Deleting client with id:', command);
      return await this.useCase.execute(command);
    } catch (error) {
      this.logger.error('Error deleting client:', error);
      throw error;
    }
  }
}
