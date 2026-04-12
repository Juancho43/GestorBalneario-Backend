import { ProcessPayment } from '../../../core/Payment/Application/UseCase/ProcessPayment';
import { GetInvoiceDAO } from '../../../core/Invoice/Model/DAO/GetInvoiceDAO';
import { CreatePaymentDAO } from '../../../core/Payment/Model/DAO/CreatePaymentDAO';
import { CreatePaymentCommand } from '../../../core/Payment/Application/Command/CreatePaymentCommand';
import { Currency } from '../../../core/Payment/Model/Money';
import { PaymentMethod } from '../../../core/Payment/Model/PaymentType';
import { EntityNotFoundError } from '../../../core/common/Model/Errors/EntityNotFound';
import { vi } from 'vitest';
import { Invoice } from '../../../core/Invoice/Model/Invoice';
import { InvoiceMother } from '../../mothers/InvoiceMother';
import { EventPublisher } from '../../../core/common/Application/EventPublisher';

describe('ProcessPayment UseCase', () => {
  let mockGetInvoiceDao: GetInvoiceDAO;
  let mockCreatePayment: CreatePaymentDAO;
  let mockEventPublish: EventPublisher;
  let useCase: ProcessPayment;
  let command: CreatePaymentCommand;
  let invoice: Invoice;
  let invoiceId: string;

  beforeEach(() => {
    invoice = InvoiceMother.create();
    invoiceId = invoice.id.value;
    mockGetInvoiceDao = {
      get: vi.fn().mockResolvedValue(invoice),
    } as unknown as GetInvoiceDAO;
    mockCreatePayment = {
      save: vi.fn().mockResolvedValue(undefined),
    } as unknown as CreatePaymentDAO;
    mockEventPublish = {
      publish: vi.fn().mockResolvedValue(undefined),
    };
    command = {
      amount: 1,
      changeType: 1,
      currency: Currency.ARS,
      date: new Date(),
      type: PaymentMethod.CASH,
      invoiceId: invoiceId,
      description: 'Pago',
    };

    useCase = new ProcessPayment(
      mockCreatePayment,
      mockGetInvoiceDao,
      mockEventPublish,
    );
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });
  it('should create a payment', async () => {
    await useCase.execute(command);
    expect(mockGetInvoiceDao.get).toHaveBeenCalledWith(command.invoiceId);
    expect(mockCreatePayment.save).toHaveBeenCalled();
  });
  it('should throw an error if invoice is not found', async () => {
    vi.mocked(mockGetInvoiceDao.get).mockResolvedValue(null);
    await expect(useCase.execute(command)).rejects.toThrow(EntityNotFoundError);
  });
});
