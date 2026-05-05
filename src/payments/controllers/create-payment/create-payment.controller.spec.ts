import {Test, TestingModule} from '@nestjs/testing';
import {CreatePaymentController} from './create-payment.controller';
import {CreatePaymentCommand} from '../../../../core/Payment/Application/Command/CreatePaymentCommand';
import {Currency} from '../../../../core/Payment/Model/Money';
import {PaymentMethod} from '../../../../core/Payment/Model/PaymentType';
import {GetActiveSeasonService} from '../../../seasons/services/get-active-season/get-active-season.service';
import {CurrentSeasonGuard} from '../../../guards/current-season.guard';
import {CreatePaymentService} from '../../services/create-payment/create-payment.service';
import {Season} from '../../../../core/Season/Model/Season';
import {PaymentResponse} from '../../../../core/Payment/Application/DTO/PaymentResponse';

describe('CreatePaymentController', () => {
  let controller: CreatePaymentController;
  let getActiveMock;
  let serviceMock;
  let guardMock;
  let command: CreatePaymentCommand;
  beforeEach(async () => {
    command = {
      amount: 0,
      changeType: 0,
      currency: Currency.ARS,
      date: new Date(),
      invoiceId: '',
      type: PaymentMethod.CASH,
    };

    guardMock = {
      canActivate: jest.fn().mockResolvedValue(true),
    };
    serviceMock = {
      execute: jest.fn().mockResolvedValue({} as PaymentResponse),
    };
    getActiveMock = {
      get: jest.fn().mockResolvedValue({} as Season),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: GetActiveSeasonService,
          useValue: getActiveMock,
        },
        {
          provide: CreatePaymentService,
          useValue: serviceMock,
        },
        {
          provide: CurrentSeasonGuard,
          useValue: guardMock,
        },
      ],
      controllers: [CreatePaymentController],
    }).compile();

    controller = module.get<CreatePaymentController>(CreatePaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a payment', async () => {
    // Act
    const result = await controller.execute(command);

    // Assert (Validación del éxito)
    expect(serviceMock.execute).toHaveBeenCalledWith(command);
    expect(result.statusCode).toBe(201); // El éxito que definiste en tu controlador
    expect(result.message).toContain('has been created');
  });
  it('should return error response if service throws', async () => {
    const errorMock = new Error('Service error');
    serviceMock.execute.mockRejectedValue(errorMock);

    const result = await controller.execute(command);

    expect(result.statusCode).toBe(500);
  });
});
