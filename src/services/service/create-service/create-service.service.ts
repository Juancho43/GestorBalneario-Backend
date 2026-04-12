import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateServiceCommand } from '../../../../core/Service/Application/Commands/CreateServiceCommand';
import type { CreateServiceDAO } from '../../../../core/Service/Model/DAO/CreateServiceDAO';
import { ServiceResponse } from '../../../../core/Service/Application/DTO/ServiceResponse';
import { CreateService } from '../../../../core/Service/Application/UseCase/CRUD/CreateService';
import { GetActiveSeasonService } from '../../../seasons/services/get-active-season/get-active-season.service';

@Injectable()
export class CreateServiceService {
  private logger = new Logger(CreateServiceService.name);
  private useCase: CreateService;
  constructor(
    @Inject('CREATE_SERVICE') private dao: CreateServiceDAO,
    @Inject() season: GetActiveSeasonService,
  ) {
    this.useCase = new CreateService(dao, season);
  }

  async execute(command: CreateServiceCommand) {
    try {
      this.logger.debug('Creating a service', command);
      return ServiceResponse.create(await this.useCase.execute(command));
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
