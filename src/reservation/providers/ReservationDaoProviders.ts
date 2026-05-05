import {Provider} from '@nestjs/common';
import {RESERVATION_TOKEN} from '../RESERVATION_TOKEN';
import {SqliteDeleteReservation} from '../repository/Crud/SqliteDeleteReservation';
import {SqliteCreateReservation} from '../repository/Crud/SqliteCreateReservation';
import {SqliteUpdateReservation} from '../repository/Crud/SqliteUpdateReservation';
import {SqliteGetReservation} from '../repository/Crud/SqliteGetReservation';
import {SqliteGetReservationDetail} from '../repository/SqliteGetReservationDetail';
import {SqliteGetActiveReservation} from '../repository/SqliteGetActiveReservation';

export const ReservationDaoProviders: Provider[] = [
  {
    provide: RESERVATION_TOKEN.DAOS.DELETE_RESERVATION_DAO,
    useClass: SqliteDeleteReservation,
  },
  {
    provide: RESERVATION_TOKEN.DAOS.CREATE_RESERVATION_DAO,
    useClass: SqliteCreateReservation,
  },
  {
    provide: RESERVATION_TOKEN.DAOS.UPDATE_RESERVATION_DAO,
    useClass: SqliteUpdateReservation,
  },
  {
    provide: RESERVATION_TOKEN.DAOS.GET_RESERVATION,
    useClass: SqliteGetReservation,
  },
  {
    provide: RESERVATION_TOKEN.DAOS.GET_DETAILS,
    useClass: SqliteGetReservationDetail,
  },
  // {
  //     provide: RESERVATION_TOKEN.DAOS.,
  //     useClass: SqliteGetReservationHistory,
  // },
  {
    provide: RESERVATION_TOKEN.DAOS.GET_CURRENT,
    useClass: SqliteGetActiveReservation,
  },
];
