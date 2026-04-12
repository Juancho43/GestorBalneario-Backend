import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientSearch } from '../../../../core/Client/Application/UseCase/ClientSearch';
import type { ClientSearcherDAO } from '../../../../core/Client/Application/Interfaces/ClientSearcherDAO';
import { ClientSearchQuery } from '../../../../core/Client/Application/Queries/ClientSearchQuery';
import { ClientResponse } from '../../../../core/Client/Application/DTO/ClientResponse';

@Injectable()
export class ClientSearcherService {
  private logger = new Logger(ClientSearcherService.name);
  private useCase: ClientSearch;

  constructor(@Inject('SEARCHER') dao: ClientSearcherDAO) {
    this.useCase = new ClientSearch(dao);
  }

  execute(query: ClientSearchQuery): Promise<ClientResponse[]> {
    try {
      this.logger.debug('Executing ClientSearcherService', query);
      return this.useCase.execute(query);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
