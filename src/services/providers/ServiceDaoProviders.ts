import {Provider} from '@nestjs/common';
import {SERVICE_TOKEN} from '../SERVICE_TOKEN';
import {SqliteServiceUpdate} from '../repository/CRUD/SqliteServiceUpdate';
import {SqliteCreateService} from '../repository/CRUD/SqliteCreateService';
import {SqliteGetService} from '../repository/CRUD/SqliteGetService';
import {SqliteSeasonsServices} from '../repository/SqliteSeasonsServices';
import {SqliteGetServices} from '../repository/SqliteGetServices';
import {SqliteServiceDelete} from "../repository/CRUD/SqliteServiceDelete";
import {ServiceSearcher} from "../repository/SqliteSeviceSearch";

export const ServiceDaoProviders: Provider[] = [
  {
    provide: SERVICE_TOKEN.DAOS.DELETE_SERVICE_DAO,
    useClass: SqliteServiceDelete,
  },
  {
    provide: SERVICE_TOKEN.DAOS.CREATE_SERVICE_DAO,
    useClass: SqliteCreateService,
  },
  {
    provide: SERVICE_TOKEN.DAOS.UPDATE_SERVICE_DAO,
    useClass: SqliteServiceUpdate,
  },
  {
    provide: SERVICE_TOKEN.DAOS.GET_SERVICE,
    useClass: SqliteGetService,
  },
  {
    provide: SERVICE_TOKEN.DAOS.GET_SEASON_SERVICE,
    useClass: SqliteSeasonsServices,
  },
  {
    provide: SERVICE_TOKEN.DAOS.GET_SERVICES,
    useClass: SqliteGetServices,
  },
  {
    provide: SERVICE_TOKEN.DAOS.SEARCHER,
    useClass: ServiceSearcher,
  },
];
