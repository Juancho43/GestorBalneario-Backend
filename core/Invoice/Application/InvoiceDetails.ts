import {IUseCase} from "../../common/Application/IUseCase";
import {InvoiceDetailQuery} from "./DTO/InvoiceDetailQuery";
import {InvoiceDetailsDTO} from "./DTO/InvoiceDetailsDTO";
import {InvoiceDetailDAO} from "./InvoiceDetailDAO";

export class InvoiceDetails implements IUseCase<InvoiceDetailQuery, InvoiceDetailsDTO>{
    constructor(private dao: InvoiceDetailDAO ) {
    }
    execute(request: InvoiceDetailQuery): Promise<InvoiceDetailsDTO> {
        return this.dao.get(request);
    }

}