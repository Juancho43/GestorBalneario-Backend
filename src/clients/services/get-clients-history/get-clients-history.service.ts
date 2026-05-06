import {Inject, Injectable, Logger} from '@nestjs/common';
import {PaginatedQuery} from '../../../../core/common/Application/PaginatedQuery';
import {GetClientsHistory} from '../../../../core/Client/Application/UseCase/GetClientsHistory';
import {CLIENT_TOKEN} from '../../CLIENT_TOKEN';

@Injectable()
export class GetClientsHistoryService {
  private logger = new Logger(GetClientsHistoryService.name);
  constructor(
    @Inject(CLIENT_TOKEN.USECASE.CLIENT_LIST)
    private useCase: GetClientsHistory,
  ) {}

  async execute(query: PaginatedQuery) {
    try {
      this.logger.debug('Executing GetClientsHistoryService');
      return await this.useCase.execute(query);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
