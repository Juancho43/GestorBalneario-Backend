import {Module} from '@nestjs/common';
import {CreateServiceController} from './controllers/create-service/create-service.controller';
import {GetServiceController} from './controllers/get-service/get-service.controller';
import {GetServiceService} from './service/get-service/get-service.service';
import {CreateServiceService} from './service/create-service/create-service.service';
import {SeasonModule} from '../seasons/season.module';
import {GetSeasonServicesController} from './controllers/get-season-services/get-season-services.controller';
import {GetSeasonServicesService} from './service/get-season-services/get-season-services.service';
import {EditServiceController} from './controllers/edit-service/edit-service.controller';
import {DeleteServiceController} from './controllers/delete-service/delete-service.controller';
import {DeleteServiceService} from './service/delete-service/delete-service.service';
import {UpdateServiceService} from './service/update-service/update-service.service';
import {ServiceDaoProviders} from './providers/ServiceDaoProviders';
import {ServiceUseCaseProviders} from './providers/ServiceUseCaseProviders';
import {SERVICE_TOKEN} from './SERVICE_TOKEN';
import { GetServiceTypesService } from './service/get-service-types/get-service-types.service';
import { GetServiceTypesController } from './controllers/get-service-types/get-service-types.controller';

@Module({
  imports: [SeasonModule],
  controllers: [
    CreateServiceController,
    GetServiceController,
    GetSeasonServicesController,
    EditServiceController,
    DeleteServiceController,
    GetServiceTypesController,
  ],
  providers: [
    ...ServiceDaoProviders,
    ...ServiceUseCaseProviders,
    GetServiceService,
    CreateServiceService,
    GetSeasonServicesService,
    DeleteServiceService,
    UpdateServiceService,
    GetServiceTypesService,
  ],
  exports: [SERVICE_TOKEN.DAOS.GET_SERVICE],
})
export class ServicesModule {}
