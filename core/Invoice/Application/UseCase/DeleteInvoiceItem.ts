import {IUseCase} from "../../../common/Application/IUseCase";
import {Invoice} from "../../Model/Invoice";
import {EventPublisher} from "../../../common/Application/EventPublisher";
import {EntityNotFoundError} from "../../../common/Model/Errors/EntityNotFound";
import {DeleteInvoiceItemCommand} from "../Commands/DeleteInvoiceItemCommand";
import {DeleteInvoiceItemDAO} from "../../Model/DAO/DeleteInvoiceItemDAO";
import {InvoiceItemDeleted} from "../../Model/Event/InvoiceItemDeleted";
import {DeleteInvoiceItemDTO} from "../DTO/DeleteInvoiceItemDTO";
import {GetInvoiceDAO} from "../../Model/DAO/GetInvoiceDAO";
import {UUID} from "../../../common/Model/UUID";

export class DeleteInvoiceItem implements IUseCase<DeleteInvoiceItemCommand,Invoice> {

    constructor(
        private getInvoice: GetInvoiceDAO,
        private dao: DeleteInvoiceItemDAO,
        private eventPublisher: EventPublisher,
    ) {
    }

    async execute(request: DeleteInvoiceItemCommand): Promise<Invoice> {
        const invoiceToWork= await this.getInvoice.get(request.invoiceId);
        if(!invoiceToWork){
            throw new EntityNotFoundError('Invoice',request.invoiceId);
        }
        invoiceToWork.deleteInvoiceItem(UUID.restore(request.itemId));
        await this.dao.delete(new DeleteInvoiceItemDTO(invoiceToWork,request.itemId));
        this.eventPublisher.publish(new InvoiceItemDeleted(invoiceToWork.id.value));
        return Promise.resolve(invoiceToWork);
    }
}