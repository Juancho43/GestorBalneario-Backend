import { Test, TestingModule } from '@nestjs/testing';
import { GetPaymentController } from './get-payment.controller';

describe('GetPaymentController', () => {
  let controller: GetPaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetPaymentController],
    }).compile();

    controller = module.get<GetPaymentController>(GetPaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
