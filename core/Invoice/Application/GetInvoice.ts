import {IUseCase} from "../../common/Application/IUseCase";
import {Invoice} from "../Model/Invoice";
import {GetInvoiceDAO} from "../Model/DAO/GetInvoiceDAO";

export class GetInvoice implements IUseCase<string,Invoice>  {

    constructor(private dao: GetInvoiceDAO) {
    }

    async execute(request: string): Promise<Invoice> {
        const invoice = await this.dao.get(request);
        if (!invoice) {
            throw new Error('Invoice not found');
        }
        return invoice;
    }
}