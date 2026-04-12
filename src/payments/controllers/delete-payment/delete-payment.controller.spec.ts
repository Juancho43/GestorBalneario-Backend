import { Test, TestingModule } from '@nestjs/testing';
import { DeletePaymentController } from './delete-payment.controller';

describe('DeletePaymentController', () => {
  let controller: DeletePaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeletePaymentController],
    }).compile();

    controller = module.get<DeletePaymentController>(DeletePaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
