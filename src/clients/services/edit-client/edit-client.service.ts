import {Inject, Injectable, Logger} from '@nestjs/common';
import {UpdateClient} from '../../../../core/Client/Application/UseCase/CRUD/UpdateClient';
import {UpdateClientCommand} from '../../../../core/Client/Application/Commands/UpdateClientCommand';
import {CLIENT_TOKEN} from '../../CLIENT_TOKEN';

@Injectable()
export class EditClientService {
  private logger = new Logger(EditClientService.name);
  constructor(
    @Inject(CLIENT_TOKEN.USECASE.UPDATE_CLIENT) private useCase: UpdateClient,
  ) {}

  async execute(command: UpdateClientCommand) {
    try {
      this.logger.debug('Executing EditClientService with command', command);
      return await this.useCase.execute(command);
    } catch (error) {
      this.logger.error('Error creating client:', error);
      throw error;
    }
  }
}
