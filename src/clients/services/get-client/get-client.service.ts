import { Inject, Injectable, Logger } from '@nestjs/common';
import { GetClient } from '../../../../core/Client/Application/UseCase/CRUD/GetClient';
import type { GetClientDAO } from '../../../../core/Client/Model/DAO/GetClientDAO';
import { GetClientQuery } from '../../../../core/Client/Application/Queries/GetClientQuery';
import { ClientResponse } from '../../../../core/Client/Application/DTO/ClientResponse';

@Injectable()
export class GetClientService {
  private useCase: GetClient;
  private logger = new Logger(GetClientService.name);
  constructor(@Inject('GET_CLIENT_INTERFACE') implementation: GetClientDAO) {
    this.useCase = new GetClient(implementation);
  }

  async execute(query: GetClientQuery) {
    try {
      return ClientResponse.create(await this.useCase.execute(query));
    } catch (error) {
      this.logger.error('Error getting shadow:', error);
      throw  error;
    }
  }
}
