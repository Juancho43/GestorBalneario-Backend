import { Module } from '@nestjs/common';
import { CreateReservationService } from './services/create-reservation/create-reservation.service';
import { EditReservationService } from './services/edit-reservation/edit-reservation.service';
import { DeleteReservationService } from './services/delete-reservation/delete-reservation.service';
import { GetReservationService } from './services/get-reservation/get-reservation.service';
import { GetCurrentReservationService } from './services/get-current-reservation/get-current-reservation.service';
import { GetCurrentReservationsController } from './controllers/get-current-reservations/get-current-reservations.controller';
import { EditReservationController } from './controllers/edit-reservation/edit-reservation.controller';
import { CreateReservationController } from './controllers/create-reservation/create-reservation.controller';
import { DeleteReservationController } from './controllers/delete-reservation/delete-reservation.controller';
import { GetReservationController } from './controllers/get-reservation/get-reservation.controller';
import {SqliteGetReservation} from "./repository/SqliteGetReservation";
import {SqliteGetCurrentReservation} from "./repository/SqliteGetCurrentReservation";
import {SqliteCreateReservation} from "./repository/SqliteCreateReservation";
import {SqliteDeleteReservation} from "./repository/SqliteDeleteReservation";
import {SqliteUpdateReservation} from "./repository/SqliteUpdateReservation";
import {SqliteClientGetOne} from "../clients/repository/SqliteClientGetOne";
import {SqliteShadowGetById} from "../shadow/repository/SqliteShadowGetById";
import { GetActiveReservationsController } from './controllers/get-active-reservations/get-active-reservations.controller';
import { GetActiveReservationsService } from './services/get-active-reservations/get-active-reservations.service';
import {SqliteGetActiveReservation} from "./repository/SqliteGetActiveReservation";
import {SqliteGetReservationsByShadowId} from "./repository/SqliteGetReservationsByShadowId";
import { GetReservationsWithClientsController } from './controllers/get-reservations-with-clients/get-reservations-with-clients.controller';
import {SqliteGetReservationWithClient} from "./repository/SqliteGetReservationWithClient";
import {NestEventPublisherAdapter} from "../events/NestEventPublisherAdapter";
import {CqrsModule} from "@nestjs/cqrs";
import {ReservationCreatedHandler} from "../billing/handlers/OnReservationCreatedHandler";
import {SqliteGetService} from "../services/repository/SqliteGetService";
import {BillingModule} from "../billing/billing.module";
import {AddInvoiceItemHandler} from "../billing/handlers/CreateInvoiceHandler";
import { GetReservationDetailController } from './controllers/get-reservation-detail/get-reservation-detail.controller';
import { GetReservationDetailService } from './services/get-reservation-detail/get-reservation-detail.service';
import {SqliteGetReservationDetail} from "./repository/SqliteGetReservationDetail";

@Module({
  imports:[CqrsModule,BillingModule],
  providers: [CreateReservationService, EditReservationService, DeleteReservationService, GetReservationService, GetCurrentReservationService,
    {
      provide: 'GET_RESERVATION_DAO',
      useClass:SqliteGetReservation
    },
    {
      provide:'GET_RESERVATIONS_DAO',
      useClass:SqliteGetCurrentReservation
    },
    {
      provide:'CREATE_RESERVATION_DAO',
      useClass:SqliteCreateReservation
    },
    {
      provide: 'UPDATE_RESERVATION_DAO',
      useClass:SqliteUpdateReservation
    },
    {
      provide: 'DELETE_RESERVATION_DAO',
      useClass: SqliteDeleteReservation
    },
    {
      provide: 'GET_CLIENT_INTERFACE',
      useClass: SqliteClientGetOne,
    },
    {
      provide: 'GET_SHADOW_INTERFACE',
      useClass: SqliteShadowGetById,
    },
    {
      provide: 'GET_ACTIVE_RESERVATIONS',
      useClass: SqliteGetActiveReservation,
    },
    {
      provide:'GET_RESERVATIONS_BY_SHADOW_INTERFACE',
      useClass:SqliteGetReservationsByShadowId,
    },
    {
      provide:'GET_RESERVATION_CLIENT_DAO',
      useClass: SqliteGetReservationWithClient

    },
    {
      provide:'GET_SERVICE_INTERFACE',
      useClass: SqliteGetService
    },
    {
        provide:'EVENT',
        useClass: NestEventPublisherAdapter
    },
    {
      provide:'GET_DETAILS',
      useClass: SqliteGetReservationDetail
    },
      ReservationCreatedHandler,
      AddInvoiceItemHandler,
    GetActiveReservationsService,
    GetReservationDetailService,
  ],
  controllers: [GetCurrentReservationsController, EditReservationController, CreateReservationController, DeleteReservationController, GetReservationController, GetActiveReservationsController, GetReservationsWithClientsController, GetReservationDetailController]
})
export class ReservationModule {}
