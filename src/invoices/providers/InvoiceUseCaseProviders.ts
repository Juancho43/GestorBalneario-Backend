import {Provider} from '@nestjs/common';
import {GetInvoice} from '../../../core/Invoice/Application/UseCase/CRUD/GetInvoice';
import {INVOICE_TOKEN} from '../INVOICE_TOKEN';
import {DeleteInvoice} from '../../../core/Invoice/Application/UseCase/CRUD/DeleteInvoice';
import {InvoiceDetails} from '../../../core/Invoice/Application/UseCase/InvoiceDetails';

export const InvoiceUseCaseProviders: Provider[] = [
  {
    provide: INVOICE_TOKEN.USECASE.GET_INVOICE,
    useFactory: (get) => {
      return new GetInvoice(get);
    },
    inject: [INVOICE_TOKEN.DAOS.GET_INVOICE],
  },
  {
    provide: INVOICE_TOKEN.USECASE.DELETE_INVOICE,
    useFactory: (dao, get) => {
      return new DeleteInvoice(dao, get);
    },
    inject: [
      INVOICE_TOKEN.DAOS.DELETE_INVOICE_DAO,
      INVOICE_TOKEN.DAOS.GET_INVOICE,
    ],
  },
  {
    provide: INVOICE_TOKEN.USECASE.INVOICE_DETAILS,
    useFactory: (dao) => {
      return new InvoiceDetails(dao);
    },
    inject: [INVOICE_TOKEN.DAOS.INVOICE_DETAILS],
  },
];
