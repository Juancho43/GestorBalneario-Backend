import {Test, TestingModule} from '@nestjs/testing';
import {InvoicesSearcherService} from './invoices-searcher.service';

describe('InvoicesSearcherService', () => {
  let service: InvoicesSearcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoicesSearcherService],
    }).compile();

    service = module.get<InvoicesSearcherService>(InvoicesSearcherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
