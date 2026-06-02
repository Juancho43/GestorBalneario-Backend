import {Test, TestingModule} from '@nestjs/testing';
import {PutInvoiceItemService} from './put-invoice-item.service';

describe('PutInvoiceItemService', () => {
  let service: PutInvoiceItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PutInvoiceItemService],
    }).compile();

    service = module.get<PutInvoiceItemService>(PutInvoiceItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
