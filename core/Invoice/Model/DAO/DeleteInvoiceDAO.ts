import {Invoice} from '../Invoice';

export interface DeleteInvoiceDAO {
  delete(entity: Invoice): Promise<void>;
}
