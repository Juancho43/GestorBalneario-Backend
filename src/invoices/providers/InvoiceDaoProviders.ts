import {Provider} from '@nestjs/common';
import {INVOICE_TOKEN} from '../INVOICE_TOKEN';
import {SqliteInvoiceDelete} from '../repository/SqliteInvoiceDelete';
import {SqliteGetInvoice} from '../repository/SqliteGetInvoice';
import {SqliteInvoiceDetail} from '../repository/SqliteInvoiceDetail';
import {SqliteGetInvoices} from '../repository/SqliteGetInvoices';
import {SqliteGetSeasonsInvoices} from "../repository/SqliteGetSeasonsInvoices";
import {SqliteUpdateInvoiceItem} from "../repository/SqliteUpdateInvoiceItem";
import {SqliteDeleteInvoiceItem} from "../repository/SqliteDeleteInvoiceItem";
import {SqliteSearchInvoice} from "../repository/SqliteSearchInvoice";

export const InvoiceDaoProviders: Provider[] = [
  {
    provide: INVOICE_TOKEN.DAOS.DELETE_INVOICE_DAO,
    useClass: SqliteInvoiceDelete,
  },
  {
    provide: INVOICE_TOKEN.DAOS.GET_INVOICE,
    useClass: SqliteGetInvoice,
  },
  {
    provide: INVOICE_TOKEN.DAOS.INVOICE_LIST,
    useClass: SqliteGetInvoices,
  },
  {
    provide: INVOICE_TOKEN.DAOS.INVOICE_DETAILS,
    useClass: SqliteInvoiceDetail,
  },
  {
    provide: INVOICE_TOKEN.DAOS.INVOICE_LIST,
    useClass: SqliteGetSeasonsInvoices,
  },
  {
    provide: INVOICE_TOKEN.DAOS.INVOICE_ITEM_UPDATE,
    useClass: SqliteUpdateInvoiceItem,
  },
  {
    provide: INVOICE_TOKEN.DAOS.INVOICE_ITEM_DELETE,
    useClass: SqliteDeleteInvoiceItem,
  },
  {
    provide: INVOICE_TOKEN.DAOS.SEARCHER,
    useClass: SqliteSearchInvoice,
  }
];
