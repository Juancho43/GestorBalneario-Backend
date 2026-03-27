import { Test, TestingModule } from '@nestjs/testing';
import { GetInvoiceController } from './get-invoice.controller';

describe('GetInvoiceController', () => {
  let controller: GetInvoiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetInvoiceController],
    }).compile();

    controller = module.get<GetInvoiceController>(GetInvoiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
