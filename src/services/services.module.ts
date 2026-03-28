import { Module } from '@nestjs/common';
import { CreateServiceController } from './controllers/create-service/create-service.controller';
import { GetServiceController } from './controllers/get-service/get-service.controller';
import { GetsServicesController } from './controllers/gets-services/gets-services.controller';
import { GetsServicesService } from './service/gets-services/gets-services.service';
import { GetServiceService } from './service/get-service/get-service.service';
import { CreateServiceService } from './service/create-service/create-service.service';
import {SqliteCreateService} from "./repository/SqliteCreateService";
import {SqliteGetService} from "./repository/SqliteGetService";
import {SqliteGetServices} from "./repository/SqliteGetServices";

@Module({
  controllers: [CreateServiceController, GetServiceController, GetsServicesController],
  providers: [
    {
      provide: 'CREATE_SERVICE',
      useClass: SqliteCreateService,
    },
    {
      provide: 'GET_SERVICE',
      useClass: SqliteGetService,
    },
    {
      provide: 'GET_SERVICES',
      useClass: SqliteGetServices,
    },
    GetsServicesService, GetServiceService, CreateServiceService]
})
export class ServicesModule {}
