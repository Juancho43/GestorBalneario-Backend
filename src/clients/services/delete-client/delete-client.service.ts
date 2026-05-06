import {Inject, Injectable, Logger} from '@nestjs/common';
import {DeleteClient} from '../../../../core/Client/Application/UseCase/CRUD/DeleteClient';
import {DeleteCommand} from '../../../../core/common/Application/DeleteCommand';
import {CLIENT_TOKEN} from '../../CLIENT_TOKEN';

@Injectable()
export class DeleteClientService {
  private logger = new Logger(DeleteClient.name);
  constructor(
    @Inject(CLIENT_TOKEN.USECASE.DELETE_CLIENT) private useCase: DeleteClient,
  ) {}

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
