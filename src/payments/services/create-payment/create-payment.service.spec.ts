import {Test, TestingModule} from '@nestjs/testing';
import {CreatePaymentService} from './create-payment.service';
import {Payment} from "../../../../core/Payment/Model/Payment";
import {PAYMENT_TOKEN} from "../../PAYMENT_TOKEN";

describe('CreatePaymentService', () => {
  let service: CreatePaymentService;
  let command;
  let useCaseMock;
  beforeEach(async () => {
    useCaseMock = {
      execute: jest.fn().mockResolvedValue({} as Payment),
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatePaymentService,{
        provide: PAYMENT_TOKEN.USECASE.CREATE_PAYMENT,
        useValue: useCaseMock,
      }],
    }).compile();

    service = module.get<CreatePaymentService>(CreatePaymentService);
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
