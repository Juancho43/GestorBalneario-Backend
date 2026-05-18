import {IUseCase} from '../../../common/Application/IUseCase';
import {GetClientsInvoicesDAO} from '../../../Client/Model/DAO/GetClientsInvoicesDAO';
import {CreateInvoiceItemDAO} from '../../Model/DAO/CreateInvoiceItemDAO';
import {GetServiceDAO} from '../../../Service/Model/DAO/GetServiceDAO';
import {EventPublisher} from '../../../common/Application/EventPublisher';
import {InvoiceItemAdded} from '../../Model/Event/InvoiceItemAdded';
import {AddInvoiceItemCommand} from '../Commands/AddInvoiceItemCommand';
import {EntityNotFoundError} from '../../../common/Model/Errors/EntityNotFound';
import {CreateInvoiceItem} from './CreateInvoiceItem';
import {CreateInvoiceItemDTO} from "../DTO/CreateInvoiceItemDTO";

export class AddInvoiceItem implements IUseCase<AddInvoiceItemCommand, void> {
  constructor(
    private getClientInvoices: GetClientsInvoicesDAO,
    private getServiceDAO: GetServiceDAO,
    private createInvoiceItemDAO: CreateInvoiceItemDAO,
    private eventPublisher: EventPublisher,
  ) {}

  async execute(request: AddInvoiceItemCommand): Promise<void> {
    const service = await this.getServiceDAO.get(request.serviceId);
    if (!service) {
      throw new EntityNotFoundError('Service', request.serviceId);
    }
    const client = await this.getClientInvoices.get(request.clientId);
    if (!client) {
      throw new EntityNotFoundError('Client', request.clientId);
    }
    let invoiceToWork = client.getOrCreateActiveInvoice();
    const item = CreateInvoiceItem.create(
      request.type,
      request.price,
      request.description,
      request.serviceId,
      request.aggregateId ?? request.serviceId,
      invoiceToWork.id.value
    );

    invoiceToWork.addItem(item);
    await this.createInvoiceItemDAO.create(new CreateInvoiceItemDTO(invoiceToWork,item));
    this.eventPublisher.publish(new InvoiceItemAdded(invoiceToWork.id.value));
  }
}
