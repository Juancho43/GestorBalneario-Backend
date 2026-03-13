import { Module } from '@nestjs/common';
import { GetClientController } from './controllers/get-client/get-client.controller';
import { CreateClientController } from './controllers/create-client/create-client.controller';
import { EditClientController } from './controllers/edit-client/edit-client.controller';
import { DeleteClientController } from './controllers/delete-client/delete-client.controller';
import { GetClientsController } from './controllers/get-clients/get-clients.controller';
import { GetClientsService } from './services/get-clients/get-clients.service';
import { GetClientService } from './services/get-client/get-client.service';
import { CreateClientService } from './services/create-client/create-client.service';
import { EditClientService } from './services/edit-client/edit-client.service';
import { DeleteClientService } from './services/delete-client/delete-client.service';
import {SqliteClientCreate} from "./repository/SqliteClientCreate";
import {SqliteClientUpdate} from "./repository/SqliteClientUpdate";
import {SqliteClientDelete} from "./repository/SqliteClientDelete";
import {SqliteClientGetOne} from "./repository/SqliteClientGetOne";
import {SqliteClientGetMany} from "./repository/SqliteClientGetMany";

@Module({
  controllers: [GetClientController, CreateClientController, EditClientController, DeleteClientController, GetClientsController],
  providers: [GetClientsService, GetClientService, CreateClientService, EditClientService, DeleteClientService,
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
    }
  ]
})
export class ClientsModule {}
