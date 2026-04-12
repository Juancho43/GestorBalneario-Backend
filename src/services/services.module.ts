import { Module } from '@nestjs/common';
import { CreateServiceController } from './controllers/create-service/create-service.controller';
import { GetServiceController } from './controllers/get-service/get-service.controller';
import { GetServiceService } from './service/get-service/get-service.service';
import { CreateServiceService } from './service/create-service/create-service.service';
import { SqliteCreateService } from './repository/SqliteCreateService';
import { SqliteGetService } from './repository/SqliteGetService';
import { SqliteGetServices } from './repository/SqliteGetServices';
import { SeasonModule } from '../seasons/season.module';
import { GetSeasonServicesController } from './controllers/get-season-services/get-season-services.controller';
import { GetSeasonServicesService } from './service/get-season-services/get-season-services.service';
import { SqliteSeasonsServices } from './repository/SqliteSeasonsServices';
import { EditServiceController } from './controllers/edit-service/edit-service.controller';
import { DeleteServiceController } from './controllers/delete-service/delete-service.controller';

@Module({
  imports: [SeasonModule],
  controllers: [
    CreateServiceController,
    GetServiceController,
    GetSeasonServicesController,
    EditServiceController,
    DeleteServiceController,
  ],
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
      provide: 'GET_SEASON_SERVICES',
      useClass: SqliteSeasonsServices,
    },
    {
      provide: 'GET_SERVICES',
      useClass: SqliteGetServices,
    },
    GetServiceService,
    CreateServiceService,
    GetSeasonServicesService,
  ],
})
export class ServicesModule {}
