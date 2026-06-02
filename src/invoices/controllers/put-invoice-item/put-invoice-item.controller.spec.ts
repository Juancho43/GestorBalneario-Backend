import {Test, TestingModule} from '@nestjs/testing';
import {PutInvoiceItemController} from './put-invoice-item.controller';

describe('PutInvoiceItemController', () => {
  let controller: PutInvoiceItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PutInvoiceItemController],
    }).compile();

    controller = module.get<PutInvoiceItemController>(PutInvoiceItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
