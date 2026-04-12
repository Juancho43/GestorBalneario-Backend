import { Module } from '@nestjs/common';
import { GetClientController } from './controllers/get-client/get-client.controller';
import { CreateClientController } from './controllers/create-client/create-client.controller';
import { EditClientController } from './controllers/edit-client/edit-client.controller';
import { DeleteClientController } from './controllers/delete-client/delete-client.controller';
import { GetClientService } from './services/get-client/get-client.service';
import { CreateClientService } from './services/create-client/create-client.service';
import { EditClientService } from './services/edit-client/edit-client.service';
import { DeleteClientService } from './services/delete-client/delete-client.service';
import { SqliteClientCreate } from './repository/SqliteClientCreate';
import { SqliteClientUpdate } from './repository/SqliteClientUpdate';
import { SqliteClientDelete } from './repository/SqliteClientDelete';
import { SqliteClientGetOne } from './repository/SqliteClientGetOne';
import { SqliteClientGetMany } from './repository/SqliteClientGetMany';
import { ClientDetailsController } from './controllers/client-details/client-details.controller';
import { ClientDetailsService } from './services/client-details/client-details.service';
import { SqliteClientDetails } from './repository/SqliteClientDetails';
import { ClientSearcherController } from './controllers/client-searcher/client-searcher.controller';
import { ClientSearcherService } from './services/client-searcher/client-searcher.service';
import { SqliteClientSearch } from './repository/SqliteClientSearch';

@Module({
  controllers: [
    GetClientController,
    CreateClientController,
    EditClientController,
    DeleteClientController,
    ClientDetailsController,
    ClientSearcherController,
  ],
  providers: [
    GetClientService,
    CreateClientService,
    EditClientService,
    DeleteClientService,
    {
      provide: 'CREATE_CLIENT_INTERFACE',
      useClass: SqliteClientCreate,
    },
    {
      provide: 'UPDATE_CLIENT_INTERFACE',
      useClass: SqliteClientUpdate,
    },
    {
      provide: 'DELETE_CLIENT_INTERFACE',
      useClass: SqliteClientDelete,
    },
    {
      provide: 'GET_CLIENT_INTERFACE',
      useClass: SqliteClientGetOne,
    },
    {
      provide: 'GET_CLIENTS_INTERFACE',
      useClass: SqliteClientGetMany,
    },
    {
      provide: 'GET_DETAILS',
      useClass: SqliteClientDetails,
    },
    {
      provide: 'SEARCHER',
      useClass: SqliteClientSearch,
    },
    ClientDetailsService,
    ClientSearcherService,
  ],
})
export class ClientsModule {}
