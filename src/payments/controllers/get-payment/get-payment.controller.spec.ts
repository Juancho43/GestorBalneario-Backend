import {Test, TestingModule} from '@nestjs/testing';
import {GetPaymentController} from './get-payment.controller';
import {PaymentMother} from "../../../../core-test/mothers/PaymentMother";
import {GetPaymentService} from "../../services/get-payment/get-payment.service";

describe('GetPaymentController', () => {
  let controller: GetPaymentController;
  let serviceMock;
  beforeEach(async () => {

    serviceMock = {
      execute: jest.fn().mockResolvedValue(PaymentMother.create())
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetPaymentController],
      providers: [
        {
          provide: GetPaymentService,
          useValue: serviceMock
        }
      ]
    }).compile();

    controller = module.get<GetPaymentController>(GetPaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(typeof controller.execute).toBe('function');
  });
  it('Should return a success response', async () => {
    const result = await controller.execute('123');
    expect(result.statusCode).toBe(200);
    expect(result.message).toContain(' has been ');
  })

});
