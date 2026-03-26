import { Injectable, Inject } from '@nestjs/common';
import {AddInvoiceItem} from "../../../../core/Invoice/Application/AddInvoiceItem";
import {AddInvoiceItemCommand} from "../../../../core/Billing/Application/DTO/AddInvoiceItemCommand";
import type {GetClientsInvoicesDAO} from "../../../../core/Client/Model/DAO/GetClientsInvoicesDAO";
import type {GetServiceDAO} from "../../../../core/Service/Model/DAO/GetServiceDAO";
import type {CreateInvoiceItemDAO} from "../../../../core/Invoice/Model/DAO/CreateInvoiceItemDAO";
import type {EventPublisher} from "../../../../core/common/Application/EventPublisher";

@Injectable()
export class AddInvoiceItemService {
    private useCase: AddInvoiceItem;

    constructor(
        @Inject('GET_CLIENT_INVOICE') private getClientInvoice: GetClientsInvoicesDAO,
        @Inject('GET_SERVICE') private getService: GetServiceDAO,
        @Inject('CREATE_INVOICE_ITEM') private createItem: CreateInvoiceItemDAO,
        @Inject('EVENT') private events: EventPublisher
    ) {
        this.useCase = new AddInvoiceItem(getClientInvoice,getService,createItem,events);
    }

    execute(command: AddInvoiceItemCommand){
        return this.useCase.execute(command);
    }

}