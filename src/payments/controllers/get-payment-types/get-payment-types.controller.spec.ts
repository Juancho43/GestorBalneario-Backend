import { Test, TestingModule } from '@nestjs/testing';
import { GetPaymentTypesController } from './get-payment-types.controller';

describe('GetPaymentTypesController', () => {
  let controller: GetPaymentTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetPaymentTypesController],
    }).compile();

    controller = module.get<GetPaymentTypesController>(GetPaymentTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
