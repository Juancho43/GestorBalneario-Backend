import {CreateInvoiceItemDTO} from "../../Application/DTO/CreateInvoiceItemDTO";

export interface CreateInvoiceItemDAO {
  create(data: CreateInvoiceItemDTO): Promise<void>;
}
