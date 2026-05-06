import {Inject, Injectable, Logger} from '@nestjs/common';
import {PaymentsReportQuery} from '../../../../core/Payment/Application/Query/PaymentsReportQuery';
import {GeneratePaymentReport} from '../../../../core/Payment/Application/UseCase/GeneratePaymentReport';
import {PAYMENT_TOKEN} from '../../PAYMENT_TOKEN';

@Injectable()
export class PaymentsReportService {
  private readonly logger = new Logger(PaymentsReportService.name);

  constructor(
    @Inject(PAYMENT_TOKEN.USECASE.REPORT)
    private useCase: GeneratePaymentReport,
  ) {}
  execute(query: PaymentsReportQuery) {
    try {
      this.logger.debug('Generating report with query', query);
      return this.useCase.execute(query);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
