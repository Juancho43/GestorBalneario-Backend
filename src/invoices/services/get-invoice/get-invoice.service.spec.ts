import {Test, TestingModule} from '@nestjs/testing';
import {GetInvoiceService} from './get-invoice.service';
import {Invoice} from "../../../../core/Invoice/Model/Invoice";
import {INVOICE_TOKEN} from "../../INVOICE_TOKEN";

describe('GetInvoiceService', () => {
  let service: GetInvoiceService;
  let useCaseMock;
  let command;
  beforeEach(async () => {
    useCaseMock = {
      execute: jest.fn().mockResolvedValue({} as Invoice),
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetInvoiceService,
        {
          provide: INVOICE_TOKEN.USECASE.GET_INVOICE,
          useValue: useCaseMock
        }],
    }).compile();

    service = module.get<GetInvoiceService>(GetInvoiceService);
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
