import {Provider} from '@nestjs/common';
import {SERVICE_TOKEN} from '../SERVICE_TOKEN';
import {DeleteService} from '../../../core/Service/Application/UseCase/CRUD/DeleteService';
import {UpdateService} from '../../../core/Service/Application/UseCase/CRUD/UpdateService';
import {CreateService} from '../../../core/Service/Application/UseCase/CRUD/CreateService';
import {GetService} from '../../../core/Service/Application/UseCase/CRUD/GetService';
import {GetSeasonServices} from '../../../core/Service/Application/UseCase/GetSeasonServices';
import {GetActiveSeasonService} from '../../seasons/services/get-active-season/get-active-season.service';
import {ServiceSearch} from "../../../core/Service/Application/UseCase/ServiceSearch";

export const ServiceUseCaseProviders: Provider[] = [
  {
    provide: SERVICE_TOKEN.USECASE.GET_SERVICE,
    useFactory: (get) => {
      return new GetService(get);
    },
    inject: [SERVICE_TOKEN.DAOS.GET_SERVICE],
  },
  {
    provide: SERVICE_TOKEN.USECASE.CREATE_SERVICE,
    useFactory: (dao, season) => {
      return new CreateService(dao, season);
    },
    inject: [SERVICE_TOKEN.DAOS.CREATE_SERVICE_DAO, GetActiveSeasonService],
  },
  {
    provide: SERVICE_TOKEN.USECASE.UPDATE_SERVICE,
    useFactory: (dao, get) => {
      return new UpdateService(dao, get);
    },
    inject: [
      SERVICE_TOKEN.DAOS.UPDATE_SERVICE_DAO,
      SERVICE_TOKEN.DAOS.GET_SERVICE,
    ],
  },
  {
    provide: SERVICE_TOKEN.USECASE.DELETE_SERVICE,
    useFactory: (dao, get) => {
      return new DeleteService(dao, get);
    },
    inject: [
      SERVICE_TOKEN.DAOS.DELETE_SERVICE_DAO,
      SERVICE_TOKEN.DAOS.GET_SERVICE,
    ],
  },
  {
    provide: SERVICE_TOKEN.USECASE.GET_SEASON_SERVICE,
    useFactory: (get) => {
      return new GetSeasonServices(get);
    },
    inject: [SERVICE_TOKEN.DAOS.GET_SEASON_SERVICE],
  },

  {
    provide: SERVICE_TOKEN.USECASE.SEARCHER,
    useFactory: (dao) => {
      return new ServiceSearch(dao);
    },
    inject: [SERVICE_TOKEN.DAOS.SEARCHER],
  },
];
