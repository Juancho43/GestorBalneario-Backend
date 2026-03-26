import {IUseCase} from "../../common/Application/IUseCase";
import {AddInvoiceItemCommand} from "../../Billing/Application/DTO/AddInvoiceItemCommand";
import {GetClientsInvoicesDAO} from "../../Client/Model/DAO/GetClientsInvoicesDAO";
import {UUID} from "../../common/Model/UUID";
import {Reservation_Service} from "../../Billing/Reservation_Service";
import {Money} from "../../Payment/Model/Money";
import {StringObject} from "../../common/Model/StringObject";
import {CreateInvoiceItemDAO} from "../Model/DAO/CreateInvoiceItemDAO";
import {GetServiceDAO} from "../../Service/Model/DAO/GetServiceDAO";
import {EventPublisher} from "../../common/Application/EventPublisher";
import {InvoiceItemAdded} from "./DTO/InvoiceItemAdded";

export class AddInvoiceItem implements IUseCase<AddInvoiceItemCommand, void>{

    constructor(
        private getClientInvoices: GetClientsInvoicesDAO,
        private getServiceDAO: GetServiceDAO,
        private createInvoiceItemDAO: CreateInvoiceItemDAO,
        private eventPublisher: EventPublisher
    ) {}

    async execute(request: AddInvoiceItemCommand): Promise<void> {
        const service = await this.getServiceDAO.get(request.serviceId);
        if(!service){
            throw new Error("Service not found");
        }
        const client = await this.getClientInvoices.get(request.clientId);
        let invoiceToWork = client.getOrCreateActiveInvoice();

        const reservationItem = Reservation_Service.create(
            UUID.create(),
            Money.create(request.price),
            StringObject.create(request.description),
            UUID.restore(request.serviceId),
            UUID.restore(request.aggregateId),
        )
        invoiceToWork.addItem(reservationItem);
        await this.createInvoiceItemDAO.create(reservationItem);
        this.eventPublisher.publish(new InvoiceItemAdded(invoiceToWork.id.value));
    }
}