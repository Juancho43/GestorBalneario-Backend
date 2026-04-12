import { Inject, Injectable, Logger } from '@nestjs/common';
import { GetClientQuery } from '../../../../core/Client/Application/Queries/GetClientQuery';
import type { ClientDetailsDAO } from '../../../../core/Client/Application/Interfaces/ClientDetailsDAO';
import { GetClientDetails } from '../../../../core/Client/Application/UseCase/GetClientDetails';
import { ClientDetailQuery } from '../../../../core/Client/Application/Queries/ClientDetailQuery';

@Injectable()
export class ClientDetailsService {
  private logger = new Logger(ClientDetailsService.name);
  private useCase: GetClientDetails;
  constructor(@Inject('GET_DETAILS') dao: ClientDetailsDAO) {
    this.useCase = new GetClientDetails(dao);
  }

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
