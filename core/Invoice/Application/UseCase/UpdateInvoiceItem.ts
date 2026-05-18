import {IUseCase} from "../../../common/Application/IUseCase";
import {Invoice} from "../../Model/Invoice";
import {GetServiceDAO} from "../../../Service/Model/DAO/GetServiceDAO";
import {EventPublisher} from "../../../common/Application/EventPublisher";
import {EntityNotFoundError} from "../../../common/Model/Errors/EntityNotFound";
import {UpdateInvoiceItemCommand} from "../Commands/UpdateInvoiceItemCommand";
import {UpdateInvoiceItemDAO} from "../../Model/DAO/UpdateInvoiceItemDAO";
import {CreateInvoiceItem} from "./CreateInvoiceItem";
import {UpdateInvoiceItemDTO} from "../DTO/UpdateInvoiceItemDTO";
import {InvoiceItemUpdated} from "../../Model/Event/InvoiceItemUpdated";
import {GetInvoiceDAO} from "../../Model/DAO/GetInvoiceDAO";

export class UpdateInvoiceItem implements IUseCase<UpdateInvoiceItemCommand,Invoice> {

    constructor(
        private getInvoiceDAO: GetInvoiceDAO,
        private getServiceDAO: GetServiceDAO,
        private dao: UpdateInvoiceItemDAO,
        private eventPublisher: EventPublisher,
    ) {
    }

    async execute(request: UpdateInvoiceItemCommand): Promise<Invoice> {
        const service = await this.getServiceDAO.get(request.serviceId);
        if (!service) {
            throw new EntityNotFoundError('Service', request.serviceId);
        }
        const invoice = await this.getInvoiceDAO.get(request.invoiceId);
        if (!invoice) {
            throw new EntityNotFoundError('Invoice', request.invoiceId);
        }
        const item = CreateInvoiceItem.create(
            request.type,
            request.price,
            service.name.getValue(),
            request.serviceId,
            request.serviceId,
            invoice.id.value,
            request.id
        );
        invoice.updateInvoiceItem(item);
        await this.dao.update(new UpdateInvoiceItemDTO(invoice,item));
        this.eventPublisher.publish(new InvoiceItemUpdated(invoice.id.value));
        return Promise.resolve(invoice);
    }
}