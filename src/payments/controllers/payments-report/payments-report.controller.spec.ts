import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsReportController } from './payments-report.controller';

describe('PaymentsReportController', () => {
  let controller: PaymentsReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsReportController],
    }).compile();

    controller = module.get<PaymentsReportController>(PaymentsReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
