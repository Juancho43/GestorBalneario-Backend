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

@Module({
  controllers: [GetClientController, CreateClientController, EditClientController, DeleteClientController, GetClientsController],
  providers: [GetClientsService, GetClientService, CreateClientService, EditClientService, DeleteClientService]
})
export class ClientsModule {}
