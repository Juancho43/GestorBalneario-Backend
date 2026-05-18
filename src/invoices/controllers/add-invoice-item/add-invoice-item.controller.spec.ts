import { Test, TestingModule } from '@nestjs/testing';
import { AddInvoiceItemController } from './add-invoice-item.controller';

describe('AddInvoiceItemController', () => {
  let controller: AddInvoiceItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddInvoiceItemController],
    }).compile();

    controller = module.get<AddInvoiceItemController>(AddInvoiceItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
