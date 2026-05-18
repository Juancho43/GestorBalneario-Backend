import {Provider} from '@nestjs/common';
import {CLIENT_TOKEN} from '../CLIENT_TOKEN';
import {SqliteClientCreate} from '../repository/CRUD/SqliteClientCreate';
import {SqliteClientUpdate} from '../repository/CRUD/SqliteClientUpdate';
import {SqliteClientDelete} from '../repository/CRUD/SqliteClientDelete';
import {SqliteClientGetOne} from '../repository/CRUD/SqliteClientGetOne';
import {SqliteClientGetMany} from '../repository/SqliteClientGetMany';
import {SqliteClientDetails} from '../repository/SqliteClientDetails';
import {SqliteClientSearch} from '../repository/SqliteClientSearch';
import {SqliteGetClientInvoice} from "../repository/SqliteGetClientInvoice";

export const ClientDaoProviders: Provider[] = [
  {
    provide: CLIENT_TOKEN.DAOS.CREATE_CLIENT_DAO,
    useClass: SqliteClientCreate,
  },
  {
    provide: CLIENT_TOKEN.DAOS.UPDATE_CLIENT_DAO,
    useClass: SqliteClientUpdate,
  },
  {
    provide: CLIENT_TOKEN.DAOS.DELETE_CLIENT_DAO,
    useClass: SqliteClientDelete,
  },
  {
    provide: CLIENT_TOKEN.DAOS.GET_CLIENT,
    useClass: SqliteClientGetOne,
  },
  {
    provide: CLIENT_TOKEN.DAOS.CLIENT_LIST,
    useClass: SqliteClientGetMany,
  },
  {
    provide: CLIENT_TOKEN.DAOS.CLIENT_DETAILS,
    useClass: SqliteClientDetails,
  },
  {
    provide: CLIENT_TOKEN.DAOS.SEARCHER,
    useClass: SqliteClientSearch,
  },
  {
    provide: CLIENT_TOKEN.DAOS.CLIENT_INVOICES,
    useClass: SqliteGetClientInvoice,
  }
];
