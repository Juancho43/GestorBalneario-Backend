import {Module} from '@nestjs/common';
import {CreateReservationService} from './services/create-reservation/create-reservation.service';
import {EditReservationService} from './services/edit-reservation/edit-reservation.service';
import {DeleteReservationService} from './services/delete-reservation/delete-reservation.service';
import {GetReservationService} from './services/get-reservation/get-reservation.service';
import {EditReservationController} from './controllers/edit-reservation/edit-reservation.controller';
import {CreateReservationController} from './controllers/create-reservation/create-reservation.controller';
import {DeleteReservationController} from './controllers/delete-reservation/delete-reservation.controller';
import {GetReservationController} from './controllers/get-reservation/get-reservation.controller';

import {
    GetActiveReservationsController
} from './controllers/get-active-reservations/get-active-reservations.controller';
import {GetActiveReservationsService} from './services/get-active-reservations/get-active-reservations.service';
import {CqrsModule} from '@nestjs/cqrs';
import {ReservationCreatedHandler} from '../events/handlers/OnReservationCreatedHandler';
import {EventsModule} from '../events/eventsModule';
import {AddInvoiceItemHandler} from '../events/handlers/CreateInvoiceHandler';
import {GetReservationDetailController} from './controllers/get-reservation-detail/get-reservation-detail.controller';
import {GetReservationDetailService} from './services/get-reservation-detail/get-reservation-detail.service';
import {SeasonModule} from '../seasons/season.module';
import {ClientsModule} from '../clients/clients.module';
import {ShadowModule} from '../shadow/shadow.module';
import {ServicesModule} from '../services/services.module';
import {RESERVATION_TOKEN} from './RESERVATION_TOKEN';
import {ReservationDaoProviders} from './providers/ReservationDaoProviders';
import {ReservationUseCaseProvider} from './providers/ReservationUseCaseProvider';
import {GetSeasonReservationsService} from './services/get-season-reservations/get-season-reservations.service';
import {
    GetSeasonReservationsController
} from "./controllers/get-season-reservations/get-season-reservations.controller";
import {ReservationSearcherController} from './controllers/reservation-searcher/reservation-searcher.controller';
import {ReservationSearcherService} from './services/reservation-searcher/reservation-searcher.service';

@Module({
  imports: [
    CqrsModule,
    EventsModule,
    SeasonModule,
    ClientsModule,
    ShadowModule,
    ServicesModule,
  ],
  providers: [
    ...ReservationDaoProviders,
    ...ReservationUseCaseProvider,

    CreateReservationService,
    EditReservationService,
    DeleteReservationService,
    GetReservationService,
    GetActiveReservationsService,
    GetReservationDetailService,
    AddInvoiceItemHandler,
    ReservationCreatedHandler,
    GetSeasonReservationsService,
    ReservationSearcherService,
  ],
  controllers: [
    EditReservationController,
    CreateReservationController,
    DeleteReservationController,
    GetReservationController,
    GetActiveReservationsController,
    GetReservationDetailController,
      GetSeasonReservationsController,
      ReservationSearcherController
  ],
  exports: [RESERVATION_TOKEN.DAOS.GET_RESERVATION],
})
export class ReservationModule {}
