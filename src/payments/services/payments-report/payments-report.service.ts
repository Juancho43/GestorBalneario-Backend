import {Inject, Injectable, Logger} from '@nestjs/common';
import {PaymentsReportQuery} from "../../../../core/Payment/Application/Query/PaymentsReportQuery";
import {GeneratePaymentReport} from "../../../../core/Payment/Application/GeneratePaymentReport";
import type {PaymentsReportDAO} from "../../../../core/Payment/Application/PaymentsReportDAO";

@Injectable()
export class PaymentsReportService {
    private readonly logger = new Logger(PaymentsReportService.name);
    private useCase: GeneratePaymentReport;

    constructor(@Inject('PAYMENT_REPORT') dao: PaymentsReportDAO) {
        this.useCase = new GeneratePaymentReport(dao);
    }

    execute(query: PaymentsReportQuery) {
        try{
            this.logger.debug('Generating report with query', query);
            return this.useCase.execute(query);
        }catch(error){
            this.logger.error(error);
            throw error
        }
    }

}
