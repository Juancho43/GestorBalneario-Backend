import {Provider} from '@nestjs/common';
import {PAYMENT_TOKEN} from '../PAYMENT_TOKEN';
import {SqliteCreatePayment} from '../repository/SqliteCreatePayment';
import {SqliteGetPayment} from '../repository/SqliteGetPayment';
import {SqlitePaymentReport} from '../repository/SqlitePaymentReport';
import {SqlitePaymentDelete} from '../repository/SqlitePaymentDelete';

export const PaymentDaoProvider: Provider[] = [
  {
    provide: PAYMENT_TOKEN.DAOS.DELETE_PAYMENT_DAO,
    useClass: SqlitePaymentDelete,
  },
  {
    provide: PAYMENT_TOKEN.DAOS.CREATE_PAYMENT_DAO,
    useClass: SqliteCreatePayment,
  },
  {
    provide: PAYMENT_TOKEN.DAOS.GET_PAYMENT,
    useClass: SqliteGetPayment,
  },
  {
    provide: PAYMENT_TOKEN.DAOS.PAYMENT_REPORT,
    useClass: SqlitePaymentReport,
  },
];
