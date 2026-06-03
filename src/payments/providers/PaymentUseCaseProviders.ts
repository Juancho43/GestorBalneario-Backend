import {Provider} from '@nestjs/common';
import {PAYMENT_TOKEN} from '../PAYMENT_TOKEN';
import {GetPayment} from '../../../core/Payment/Application/UseCase/CRUD/GetPayment';
import {ProcessPayment} from '../../../core/Payment/Application/UseCase/ProcessPayment';
import {DeletePayment} from '../../../core/Payment/Application/UseCase/CRUD/DeletePayment';
import {INVOICE_TOKEN} from '../../invoices/INVOICE_TOKEN';
import {GeneratePaymentReport} from '../../../core/Payment/Application/UseCase/GeneratePaymentReport';
import {ReportStrategyFactory} from "../../../core/Payment/Application/UseCase/ReportStrategyFactory";
import {ExportPaymentReport} from "../../../core/Payment/Application/UseCase/ExportPaymentReport";

export const PaymentUseCaseProviders: Provider[] = [
  {
    provide: PAYMENT_TOKEN.USECASE.GET_PAYMENT,
    useFactory: (get) => {
      return new GetPayment(get);
    },
    inject: [PAYMENT_TOKEN.DAOS.GET_PAYMENT],
  },
  {
    provide: PAYMENT_TOKEN.USECASE.CREATE_PAYMENT,
    useFactory: (dao, invoice, event) => {
      return new ProcessPayment(dao, invoice, event);
    },
    inject: [
      PAYMENT_TOKEN.DAOS.CREATE_PAYMENT_DAO,
      INVOICE_TOKEN.DAOS.GET_INVOICE,
      'EVENT',
    ],
  },

  {
    provide: PAYMENT_TOKEN.USECASE.DELETE_PAYMENT,
    useFactory: (dao, get) => {
      return new DeletePayment(dao, get);
    },
    inject: [
      PAYMENT_TOKEN.DAOS.DELETE_PAYMENT_DAO,
      PAYMENT_TOKEN.DAOS.GET_PAYMENT,
    ],
  },
  {
    provide: PAYMENT_TOKEN.USECASE.REPORT,
    useFactory: (dao) => {
      return new GeneratePaymentReport(dao);
    },
    inject: [PAYMENT_TOKEN.DAOS.PAYMENT_REPORT],
  },
  {
    provide: PAYMENT_TOKEN.STRATEGY.FACTORY,
    useFactory: () => {
      return new ReportStrategyFactory();
    },
  },

  {
    provide: PAYMENT_TOKEN.USECASE.EXPORT_REPORT,
    useFactory: (factory: ReportStrategyFactory) => {
      return new ExportPaymentReport(factory);
    },
    inject: [PAYMENT_TOKEN.STRATEGY.FACTORY],
  },
];
