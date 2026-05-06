import {Inject, Injectable, Logger} from '@nestjs/common';
import {GetClient} from '../../../../core/Client/Application/UseCase/CRUD/GetClient';
import {CLIENT_TOKEN} from '../../CLIENT_TOKEN';
import {GetByIdQuery} from "../../../../core/common/Application/GetByIdQuery";

@Injectable()
export class GetClientService {
  private logger = new Logger(GetClientService.name);
  constructor(
    @Inject(CLIENT_TOKEN.USECASE.GET_CLIENT) private useCase: GetClient,
  ) {}

  async execute(query: GetByIdQuery) {
    try {
      this.logger.debug('Getting client with query: ', query);
      return await this.useCase.execute(query);
    } catch (error) {
      this.logger.error('Error getting shadow:', error);
      throw error;
    }
  }
}
