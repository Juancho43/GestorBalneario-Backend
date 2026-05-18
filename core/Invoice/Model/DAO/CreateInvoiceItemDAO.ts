import {InvoiceItem} from '../InvoiceItem';
import {Invoice} from '../Invoice';
import {CreateInvoiceItemDTO} from "../../Application/DTO/CreateInvoiceItemDTO";

export interface CreateInvoiceItemDAO {
  create(data: CreateInvoiceItemDTO): Promise<void>;
}
