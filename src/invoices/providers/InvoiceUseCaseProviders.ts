import {Provider} from '@nestjs/common';
import {GetInvoice} from '../../../core/Invoice/Application/UseCase/CRUD/GetInvoice';
import {INVOICE_TOKEN} from '../INVOICE_TOKEN';
import {DeleteInvoice} from '../../../core/Invoice/Application/UseCase/CRUD/DeleteInvoice';
import {InvoiceDetails} from '../../../core/Invoice/Application/UseCase/InvoiceDetails';
import {GetSeasonsInvoices} from "../../../core/Invoice/Application/UseCase/GetSeasonsInvoices";
import {UpdateInvoiceItem} from "../../../core/Invoice/Application/UseCase/UpdateInvoiceItem";
import {CLIENT_TOKEN} from "../../clients/CLIENT_TOKEN";
import {SERVICE_TOKEN} from "../../services/SERVICE_TOKEN";
import {DeleteInvoiceItem} from "../../../core/Invoice/Application/UseCase/DeleteInvoiceItem";

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
  {
    provide: INVOICE_TOKEN.USECASE.INVOICE_LIST,
    useFactory: (dao) =>{
      return new GetSeasonsInvoices(dao)
    },
    inject: [INVOICE_TOKEN.DAOS.INVOICE_LIST],
  },
  {
    provide: INVOICE_TOKEN.USECASE.INVOICE_ITEM_UPDATE,
    useFactory: (dao,invoice,service,event) =>{
      return new UpdateInvoiceItem(invoice,service,dao,event);
    },
    inject: [INVOICE_TOKEN.DAOS.INVOICE_ITEM_UPDATE,INVOICE_TOKEN.DAOS.GET_INVOICE,SERVICE_TOKEN.DAOS.GET_SERVICE,'EVENT'],
  },
  {
    provide: INVOICE_TOKEN.USECASE.INVOICE_ITEM_DELETE,
    useFactory: (get,dao,event) => {
      return new DeleteInvoiceItem(get,dao,event);
    },
    inject: [INVOICE_TOKEN.DAOS.GET_INVOICE,INVOICE_TOKEN.DAOS.INVOICE_ITEM_DELETE,'EVENT']
  }
];
