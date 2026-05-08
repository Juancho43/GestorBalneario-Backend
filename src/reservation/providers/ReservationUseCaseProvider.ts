import {Provider} from '@nestjs/common';
import {RESERVATION_TOKEN} from '../RESERVATION_TOKEN';
import {GetReservation} from '../../../core/Reservation/Application/UseCase/CRUD/GetReservation';
import {CreateReservation} from '../../../core/Reservation/Application/UseCase/CRUD/CreateReservation';
import {SERVICE_TOKEN} from '../../services/SERVICE_TOKEN';
import {SHADOW_TOKEN} from '../../shadow/SHADOW_TOKEN';
import {CLIENT_TOKEN} from '../../clients/CLIENT_TOKEN';
import {UpdateReservation} from '../../../core/Reservation/Application/UseCase/CRUD/UpdateReservation';
import {DeleteReservation} from '../../../core/Reservation/Application/UseCase/CRUD/DeleteReservation';
import {GetReservationDetail} from '../../../core/Reservation/Application/UseCase/GetReservationDetail';
import {GetActiveReservations} from '../../../core/Reservation/Application/UseCase/GetActiveReservations';
import {GetSeasonReservations} from "../../../core/Reservation/Application/UseCase/GetSeasonReservations";

export const ReservationUseCaseProvider: Provider[] = [
  {
    provide: RESERVATION_TOKEN.USECASE.GET_RESERVATION,
    useFactory: (get) => {
      return new GetReservation(get);
    },
    inject: [RESERVATION_TOKEN.DAOS.GET_RESERVATION],
  },
  {
    provide: RESERVATION_TOKEN.USECASE.CREATE_RESERVATION,
    useFactory: (dao, service, shadow, client, event) => {
      return new CreateReservation(dao, service, shadow, client, event);
    },
    inject: [
      RESERVATION_TOKEN.DAOS.CREATE_RESERVATION_DAO,
      SERVICE_TOKEN.DAOS.GET_SERVICE,
      SHADOW_TOKEN.DAOS.GET_SHADOW,
      CLIENT_TOKEN.DAOS.GET_CLIENT,
      'EVENT',
    ],
  },
  {
    provide: RESERVATION_TOKEN.USECASE.UPDATE_RESERVATION,
    useFactory: (dao, get, season) => {
      return new UpdateReservation(dao, get, season);
    },
    inject: [
      RESERVATION_TOKEN.DAOS.UPDATE_RESERVATION_DAO,
      RESERVATION_TOKEN.DAOS.GET_RESERVATION,
      SHADOW_TOKEN.DAOS.GET_SHADOW,
    ],
  },
  {
    provide: RESERVATION_TOKEN.USECASE.DELETE_RESERVATION,
    useFactory: (dao, get) => {
      return new DeleteReservation(dao, get);
    },
    inject: [
      RESERVATION_TOKEN.DAOS.DELETE_RESERVATION_DAO,
      RESERVATION_TOKEN.DAOS.GET_RESERVATION,
    ],
  },
  {
    provide: RESERVATION_TOKEN.USECASE.GET_DETAILS,
    useFactory: (dao) => {
      return new GetReservationDetail(dao);
    },
    inject: [RESERVATION_TOKEN.DAOS.GET_DETAILS],
  },
  {
    provide: RESERVATION_TOKEN.USECASE.GET_CURRENT,
    useFactory: (dao) => {
      return new GetActiveReservations(dao);
    },
    inject: [RESERVATION_TOKEN.DAOS.GET_CURRENT],
  },
  {
    provide: RESERVATION_TOKEN.USECASE.GET_SEASON_RESERVATIONS,
    useFactory: (dao) => {
      return new GetSeasonReservations(dao)
    },
    inject: [RESERVATION_TOKEN.DAOS.GET_SEASON_RESERVATION]
  }
];
