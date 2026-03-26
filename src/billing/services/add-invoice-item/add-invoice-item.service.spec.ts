import { Test, TestingModule } from '@nestjs/testing';
import { AddInvoiceItemService } from './add-invoice-item.service';

describe('AddInvoiceItemService', () => {
  let service: AddInvoiceItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddInvoiceItemService],
    }).compile();

    service = module.get<AddInvoiceItemService>(AddInvoiceItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
