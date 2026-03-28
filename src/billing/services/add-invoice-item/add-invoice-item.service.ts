import {Injectable, Inject, Logger} from '@nestjs/common';
import {AddInvoiceItem} from "../../../../core/Invoice/Application/AddInvoiceItem";
import {AddInvoiceItemCommand} from "../../../../core/Billing/Application/DTO/AddInvoiceItemCommand";
import type {GetClientsInvoicesDAO} from "../../../../core/Client/Model/DAO/GetClientsInvoicesDAO";
import type {GetServiceDAO} from "../../../../core/Service/Model/DAO/GetServiceDAO";
import type {CreateInvoiceItemDAO} from "../../../../core/Invoice/Model/DAO/CreateInvoiceItemDAO";
import type {EventPublisher} from "../../../../core/common/Application/EventPublisher";

@Injectable()
export class AddInvoiceItemService {
    private useCase: AddInvoiceItem;
    private logger = new Logger(AddInvoiceItemService.name);
    constructor(
        @Inject('GET_CLIENT_INVOICE')  getClientInvoice: GetClientsInvoicesDAO,
        @Inject('GET_SERVICE')  getService: GetServiceDAO,
        @Inject('CREATE_INVOICE_ITEM')  createItem: CreateInvoiceItemDAO,
        @Inject('EVENT')  events: EventPublisher
    ) {
        this.useCase = new AddInvoiceItem(getClientInvoice,getService,createItem,events);
    }

    async execute(command: AddInvoiceItemCommand){
        try{
            this.logger.debug('Adding item to invoice', command);
            return await this.useCase.execute(command);
        }catch(error){
            this.logger.error(error);
            return error
        }
    }

}