import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsReportService } from './payments-report.service';

describe('PaymentsReportService', () => {
  let service: PaymentsReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentsReportService],
    }).compile();

    service = module.get<PaymentsReportService>(PaymentsReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
