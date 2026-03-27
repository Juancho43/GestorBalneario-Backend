import { Test, TestingModule } from '@nestjs/testing';
import { GetInvoicesService } from './get-invoices.service';

describe('GetInvoicesService', () => {
  let service: GetInvoicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetInvoicesService],
    }).compile();

    service = module.get<GetInvoicesService>(GetInvoicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
