import {DeleteInvoiceItemDTO} from "../../Application/DTO/DeleteInvoiceItemDTO";

export interface DeleteInvoiceItemDAO {
  delete(data: DeleteInvoiceItemDTO): Promise<void>;
}