import { Test, TestingModule } from '@nestjs/testing';
import { DeleteInvoiceItemController } from './delete-invoice-item.controller';

describe('DeleteInvoiceItemController', () => {
  let controller: DeleteInvoiceItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteInvoiceItemController],
    }).compile();

    controller = module.get<DeleteInvoiceItemController>(DeleteInvoiceItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
