import {Test, TestingModule} from '@nestjs/testing';
import {PaymentsReportService} from './payments-report.service';
import {PAYMENT_TOKEN} from "../../PAYMENT_TOKEN";

describe('PaymentsReportService', () => {
  let service: PaymentsReportService;
  let command;
  let useCaseMock;
  beforeEach(async () => {
    useCaseMock = {
      execute: jest.fn().mockResolvedValue({} as any),
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentsReportService,{
        provide: PAYMENT_TOKEN.USECASE.REPORT,
        useValue: useCaseMock,
      }],
    }).compile();

    service = module.get<PaymentsReportService>(PaymentsReportService);
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
