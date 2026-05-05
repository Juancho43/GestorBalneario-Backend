import {Test, TestingModule} from '@nestjs/testing';
import {PaymentsReportController} from './payments-report.controller';
import {PaymentsReportDTO} from "../../../../core/Payment/Application/DTO/PaymentsReportDTO";
import {PaymentsReportService} from "../../services/payments-report/payments-report.service";

describe('PaymentsReportController', () => {
  let controller: PaymentsReportController;
  let serviceMock;
  beforeEach(async () => {
    serviceMock = {
        execute: jest.fn().mockResolvedValue({} as PaymentsReportDTO)
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsReportController],
      providers: [{
        provide: PaymentsReportService,
        useValue: serviceMock
      }]
    }).compile();

    controller = module.get<PaymentsReportController>(PaymentsReportController);
  });


  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(typeof controller.execute).toBe('function');
  });
  it('Should return a success response', async () => {
    const result = await controller.execute('2020-01-20','2020-01-30',0,10,'cash');
    expect(result.statusCode).toBe(200);
    expect(result.message).toContain(' has been ');
  })

});
