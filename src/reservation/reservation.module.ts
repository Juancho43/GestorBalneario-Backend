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

@Module({
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
  ],
  controllers: [GetCurrentReservationsController, EditReservationController, CreateReservationController, DeleteReservationController, GetReservationController]
})
export class ReservationModule {}
