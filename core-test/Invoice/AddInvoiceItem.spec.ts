import {Client} from '../../core/Client/Model/Client';
import {Service} from '../../core/Service/Model/Service';
import {Invoice} from '../../core/Invoice/Model/Invoice';
import {ClientMother} from '../mothers/ClientMother';
import {ServiceMother} from '../mothers/ServiceMother';
import {InvoiceMother} from '../mothers/InvoiceMother';
import {AddInvoiceItem} from '../../core/Invoice/Application/UseCase/AddInvoiceItem';
import {AddInvoiceItemCommand} from '../../core/Invoice/Application/Commands/AddInvoiceItemCommand';
import {UUID} from '../../core/common/Model/UUID';
import {EntityNotFoundError} from '../../core/common/Model/Errors/EntityNotFound';
import {vi} from 'vitest';

describe('AddInvoiceItem UseCase', () => {
  let mockEventPublisher;
  let mockGetServiceDAO;
  let mockCreateItemDAO;
  let mockClientInvoicesDAO;
  let useCase: AddInvoiceItem;
  let client: Client;
  let service: Service;
  let invoice: Invoice;
  let command: AddInvoiceItemCommand;
  beforeEach(() => {
    client = ClientMother.create();
    service = ServiceMother.create();
    invoice = InvoiceMother.create();
    client.addInvoice(invoice);
    mockEventPublisher = {
      publish: vi.fn().mockResolvedValue(undefined),
    };
    mockCreateItemDAO = {
      create: vi.fn().mockResolvedValue(undefined),
    };
    mockClientInvoicesDAO = {
      get: vi.fn().mockResolvedValue(client),
    };
    mockGetServiceDAO = {
      get: vi.fn().mockResolvedValue(service),
    };
    command = new AddInvoiceItemCommand(
      UUID.create().value,
      client.id.value,
      service.id.value,
      100,
      new Date(),
      'Test Item',
      'RESERVATION',
    );
    useCase = new AddInvoiceItem(
      mockClientInvoicesDAO,
      mockGetServiceDAO,
      mockCreateItemDAO,
      mockEventPublisher,
    );
  });
  afterEach(() => {
    vi.fn().mockClear();
  });

  it('should be created', () => {
    expect(useCase).toBeDefined();
    expect(useCase).toBeInstanceOf(AddInvoiceItem);
  });

  it('Should fail if dont find service ', async () => {
    mockGetServiceDAO.get.mockResolvedValue(null);
    await expect(useCase.execute(command)).rejects.toThrow(EntityNotFoundError);
  });
  it('Should fail if dont find client ', async () => {
    mockClientInvoicesDAO.get.mockResolvedValue(null);
    await expect(useCase.execute(command)).rejects.toThrow(EntityNotFoundError);
  });
  it('Should add item to invoice and publish event', async () => {
    await useCase.execute(command);
    expect(mockGetServiceDAO.get).toHaveBeenCalledWith(command.serviceId);
    expect(mockClientInvoicesDAO.get).toHaveBeenCalledWith(command.clientId);
    expect(mockCreateItemDAO.create).toHaveBeenCalled();
    expect(mockEventPublisher.publish).toHaveBeenCalled();
  });

});
