import {Provider} from '@nestjs/common';
import {CLIENT_TOKEN} from '../CLIENT_TOKEN';
import {GetClient} from '../../../core/Client/Application/UseCase/CRUD/GetClient';
import {CreateClient} from '../../../core/Client/Application/UseCase/CRUD/CreateClient';
import {UpdateClient} from '../../../core/Client/Application/UseCase/CRUD/UpdateClient';
import {DeleteClient} from '../../../core/Client/Application/UseCase/CRUD/DeleteClient';
import {GetClientDetails} from '../../../core/Client/Application/UseCase/GetClientDetails';
import {ClientSearch} from '../../../core/Client/Application/UseCase/ClientSearch';
import {GetClientsHistory} from "../../../core/Client/Application/UseCase/GetClientsHistory";

export const ClientUseCaseProviders: Provider[] = [
  {
    provide: CLIENT_TOKEN.USECASE.GET_CLIENT,
    useFactory: (get) => {
      return new GetClient(get);
    },
    inject: [CLIENT_TOKEN.DAOS.GET_CLIENT],
  },
  {
    provide: CLIENT_TOKEN.USECASE.CREATE_CLIENT,
    useFactory: (dao) => {
      return new CreateClient(dao);
    },
    inject: [CLIENT_TOKEN.DAOS.CREATE_CLIENT_DAO],
  },
  {
    provide: CLIENT_TOKEN.USECASE.UPDATE_CLIENT,
    useFactory: (dao, get) => {
      return new UpdateClient(dao, get);
    },
    inject: [CLIENT_TOKEN.DAOS.UPDATE_CLIENT_DAO, CLIENT_TOKEN.DAOS.GET_CLIENT],
  },
  {
    provide: CLIENT_TOKEN.USECASE.DELETE_CLIENT,
    useFactory: (dao, get) => {
      return new DeleteClient(dao, get);
    },
    inject: [CLIENT_TOKEN.DAOS.DELETE_CLIENT_DAO, CLIENT_TOKEN.DAOS.GET_CLIENT],
  },
  {
    provide: CLIENT_TOKEN.USECASE.CLIENT_DETAILS,
    useFactory: (dao) => {
      return new GetClientDetails(dao);
    },
    inject: [CLIENT_TOKEN.DAOS.CLIENT_DETAILS],
  },
  {
    provide: CLIENT_TOKEN.USECASE.SEARCHER,
    useFactory: (dao) => {
      return new ClientSearch(dao);
    },
    inject: [CLIENT_TOKEN.DAOS.SEARCHER],
  },
  {
    provide: CLIENT_TOKEN.USECASE.CLIENT_LIST,
    useFactory: (dao) => {
      return new GetClientsHistory(dao);
    },
    inject: [CLIENT_TOKEN.DAOS.CLIENT_LIST],
  },
];
