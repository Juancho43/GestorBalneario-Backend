import {Inject, Injectable, Logger} from '@nestjs/common';
import {ClientSearch} from '../../../../core/Client/Application/UseCase/ClientSearch';
import {ClientSearchQuery} from '../../../../core/Client/Application/Queries/ClientSearchQuery';
import {ClientResponse} from '../../../../core/Client/Application/DTO/ClientResponse';
import {CLIENT_TOKEN} from '../../CLIENT_TOKEN';

@Injectable()
export class ClientSearcherService {
  private logger = new Logger(ClientSearcherService.name);

  constructor(
    @Inject(CLIENT_TOKEN.USECASE.SEARCHER) private useCase: ClientSearch,
  ) {}

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
