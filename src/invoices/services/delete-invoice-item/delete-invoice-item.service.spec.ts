import { Test, TestingModule } from '@nestjs/testing';
import { DeleteInvoiceItemService } from './delete-invoice-item.service';

describe('DeleteInvoiceItemService', () => {
  let service: DeleteInvoiceItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteInvoiceItemService],
    }).compile();

    service = module.get<DeleteInvoiceItemService>(DeleteInvoiceItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
