import {Test, TestingModule} from '@nestjs/testing';
import {GetSeasonInvoicesService} from './get-season-invoices.service';

describe('GetSeasonInvoicesService', () => {
  let service: GetSeasonInvoicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetSeasonInvoicesService],
    }).compile();

    service = module.get<GetSeasonInvoicesService>(GetSeasonInvoicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
