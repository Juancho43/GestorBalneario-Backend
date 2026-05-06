import {Test, TestingModule} from '@nestjs/testing';
import {InvoiceDetailsService} from './invoice-details.service';
import {INVOICE_TOKEN} from "../../INVOICE_TOKEN";

describe('InvoiceDetailsService', () => {
  let service: InvoiceDetailsService;
  let command;
  let useCaseMock;
  beforeEach(async () => {
    useCaseMock = {
      execute: jest.fn().mockResolvedValue({} as any),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceDetailsService,{
        provide: INVOICE_TOKEN.USECASE.INVOICE_DETAILS,
        useValue: useCaseMock,
      }],
    }).compile();

    service = module.get<InvoiceDetailsService>(InvoiceDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('should execute the use case successfully', async () => {
    const result = await service.execute(command);

    expect(result).toBeDefined();
    expect(useCaseMock.execute).toHaveBeenCalled();
  });

  it('should log an error and re-throw if the use case fails', async () => {
    const errorSimulado = new Error('Database connection failed');
    useCaseMock.execute.mockRejectedValue(errorSimulado);
    await expect(service.execute(command)).rejects.toThrow(errorSimulado);
  });
});
