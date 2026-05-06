import {Test, TestingModule} from '@nestjs/testing';
import {DeleteInvoiceService} from './delete-invoice.service';
import {INVOICE_TOKEN} from "../../INVOICE_TOKEN";

describe('DeleteInvoiceService', () => {
  let service: DeleteInvoiceService;
  let command;
  let useCaseMock;
  beforeEach(async () => {
    useCaseMock = {
      execute: jest.fn().mockReturnValue(undefined),
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteInvoiceService,
        {
          provide: INVOICE_TOKEN.USECASE.DELETE_INVOICE,
          useValue: useCaseMock,
        }],
    }).compile();

    service = module.get<DeleteInvoiceService>(DeleteInvoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should execute the use case successfully', async () => {
    const result = await service.execute(command);

    expect(useCaseMock.execute).toHaveBeenCalled();
  });

  it('should throw error if use case throws', async () => {
    const errorSimulado = new Error('Database connection failed');
    useCaseMock.execute.mockRejectedValue(errorSimulado);
    await expect(service.execute(command)).rejects.toThrow(errorSimulado);
  });
});
