import { Test, TestingModule } from '@nestjs/testing';
import { ExportPaymentReportController } from './export-payment-report.controller';

describe('ExportPaymentReportController', () => {
  let controller: ExportPaymentReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExportPaymentReportController],
    }).compile();

    controller = module.get<ExportPaymentReportController>(ExportPaymentReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
