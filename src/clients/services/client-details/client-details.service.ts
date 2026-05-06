import {Inject, Injectable, Logger} from '@nestjs/common';
import {GetClientDetails} from '../../../../core/Client/Application/UseCase/GetClientDetails';
import {ClientDetailQuery} from '../../../../core/Client/Application/Queries/ClientDetailQuery';
import {CLIENT_TOKEN} from '../../CLIENT_TOKEN';

@Injectable()
export class ClientDetailsService {
  private logger = new Logger(ClientDetailsService.name);

  constructor(
    @Inject(CLIENT_TOKEN.USECASE.CLIENT_DETAILS)
    private useCase: GetClientDetails,
  ) {}

  execute(query: ClientDetailQuery) {
    try {
      this.logger.debug('Getting clients details', query);
      return this.useCase.execute(query);
    } catch (error) {
      this.logger.error('Error getting client details', error);
      throw error;
    }
  }
}
