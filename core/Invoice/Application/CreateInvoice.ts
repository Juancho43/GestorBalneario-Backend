import {IUseCase} from "../../common/Application/IUseCase";
import {CreateInvoiceCommand} from "../../Billing/Application/DTO/CreateInvoiceCommand";
import {Invoice} from "../Model/Invoice";

export class CreateInvoice implements IUseCase<CreateInvoiceCommand, Invoice>{
    execute(request: CreateInvoiceCommand): Promise<Invoice> {

    console.log("Executing CreateInvoice with request:", request);
    return Promise.resolve({}as Invoice);
    }

}