import {Inject, Injectable, Logger} from '@nestjs/common';
import {GetService} from '../../../../core/Service/Application/UseCase/CRUD/GetService';
import {GetByIdQuery} from '../../../../core/common/Application/GetByIdQuery';
import {SERVICE_TOKEN} from '../../SERVICE_TOKEN';

@Injectable()
export class GetServiceService {
  private logger = new Logger(GetServiceService.name);

  constructor(
    @Inject(SERVICE_TOKEN.USECASE.GET_SERVICE) private useCase: GetService,
  ) {}

  async execute(query: GetByIdQuery) {
    try {
      this.logger.debug('Getting a service', query);
      return await this.useCase.execute(query);
    } catch (e) {
      this.logger.error(e.message);
      throw e;
    }
  }
}
