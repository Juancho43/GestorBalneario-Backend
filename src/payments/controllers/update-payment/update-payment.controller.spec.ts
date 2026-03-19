import { Test, TestingModule } from '@nestjs/testing';
import { UpdatePaymentController } from './update-payment.controller';

describe('UpdatePaymentController', () => {
  let controller: UpdatePaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdatePaymentController],
    }).compile();

    controller = module.get<UpdatePaymentController>(UpdatePaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
