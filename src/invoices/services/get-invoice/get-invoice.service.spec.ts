import { Test, TestingModule } from '@nestjs/testing';
import { GetInvoiceService } from './get-invoice.service';

describe('GetInvoiceService', () => {
  let service: GetInvoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetInvoiceService],
    }).compile();

    service = module.get<GetInvoiceService>(GetInvoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
