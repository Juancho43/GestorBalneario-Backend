import {Module} from '@nestjs/common';
import {GetClientController} from './controllers/get-client/get-client.controller';
import {CreateClientController} from './controllers/create-client/create-client.controller';
import {EditClientController} from './controllers/edit-client/edit-client.controller';
import {DeleteClientController} from './controllers/delete-client/delete-client.controller';
import {GetClientService} from './services/get-client/get-client.service';
import {CreateClientService} from './services/create-client/create-client.service';
import {EditClientService} from './services/edit-client/edit-client.service';
import {DeleteClientService} from './services/delete-client/delete-client.service';
import {ClientDetailsController} from './controllers/client-details/client-details.controller';
import {ClientDetailsService} from './services/client-details/client-details.service';
import {ClientSearcherController} from './controllers/client-searcher/client-searcher.controller';
import {ClientSearcherService} from './services/client-searcher/client-searcher.service';
import {GetClientsHistoryController} from './controllers/get-clients-history/get-clients-history.controller';
import {GetClientsHistoryService} from './services/get-clients-history/get-clients-history.service';
import {CLIENT_TOKEN} from './CLIENT_TOKEN';
import {ClientDaoProviders} from './providers/ClientDaoProviders';
import {ClientUseCaseProviders} from './providers/ClientUseCaseProviders';

@Module({
  controllers: [
    GetClientController,
    CreateClientController,
    EditClientController,
    DeleteClientController,
    ClientDetailsController,
    ClientSearcherController,
    GetClientsHistoryController,
  ],
  providers: [
    ...ClientUseCaseProviders,
    ...ClientDaoProviders,
    GetClientService,
    CreateClientService,
    EditClientService,
    DeleteClientService,
    ClientDetailsService,
    ClientSearcherService,
    GetClientsHistoryService,
  ],
  exports: [CLIENT_TOKEN.DAOS.GET_CLIENT],
})
export class ClientsModule {}
