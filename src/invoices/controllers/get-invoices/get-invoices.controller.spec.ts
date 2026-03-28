import { Test, TestingModule } from '@nestjs/testing';
import { GetInvoicesController } from './get-invoices.controller';

describe('GetInvoicesController', () => {
  let controller: GetInvoicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetInvoicesController],
    }).compile();

    controller = module.get<GetInvoicesController>(GetInvoicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
