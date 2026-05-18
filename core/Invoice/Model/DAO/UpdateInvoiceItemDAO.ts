import {UpdateInvoiceItemDTO} from "../../Application/DTO/UpdateInvoiceItemDTO";

export interface UpdateInvoiceItemDAO {
    update(data: UpdateInvoiceItemDTO): Promise<void>;
}