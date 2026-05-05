import {Test, TestingModule} from '@nestjs/testing';
import {DeletePaymentController} from './delete-payment.controller';

describe('DeletePaymentController', () => {
  let controller: DeletePaymentController;
  let command;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeletePaymentController],
    }).compile();

    controller = module.get<DeletePaymentController>(DeletePaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  it('should excute', async () => {
    const result = await controller.execute(command);

    expect(result.statusCode).toBe(204);
    expect(result.message).toContain('been ');
  });
});
