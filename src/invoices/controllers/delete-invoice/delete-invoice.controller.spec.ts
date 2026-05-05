import {Test, TestingModule} from '@nestjs/testing';
import {DeleteInvoiceController} from './delete-invoice.controller';

describe('DeleteInvoiceController', () => {
  let controller: DeleteInvoiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteInvoiceController],
    }).compile();

    controller = module.get<DeleteInvoiceController>(DeleteInvoiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
