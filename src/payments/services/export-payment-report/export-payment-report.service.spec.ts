import { Test, TestingModule } from '@nestjs/testing';
import { ExportPaymentReportService } from './export-payment-report.service';

describe('ExportPaymentReportService', () => {
  let service: ExportPaymentReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExportPaymentReportService],
    }).compile();

    service = module.get<ExportPaymentReportService>(ExportPaymentReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
