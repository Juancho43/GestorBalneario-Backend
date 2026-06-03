import {Inject, Injectable, Logger} from '@nestjs/common';
import {PAYMENT_TOKEN} from "../../PAYMENT_TOKEN";
import {GeneratePaymentReport} from "../../../../core/Payment/Application/UseCase/GeneratePaymentReport";
import {ExportPaymentReport} from "../../../../core/Payment/Application/UseCase/ExportPaymentReport";
import {ExportReportQuery} from "../../../../core/Payment/Application/Query/ExportReportQuery";

@Injectable()
export class ExportPaymentReportService {
    private logger = new Logger(ExportPaymentReportService.name);
    constructor(
        @Inject(PAYMENT_TOKEN.USECASE.REPORT)
        private readonly generatePaymentReport: GeneratePaymentReport,

        @Inject(PAYMENT_TOKEN.USECASE.EXPORT_REPORT)
        private readonly exportPaymentReport: ExportPaymentReport,

    ) {}

    async execute(query: ExportReportQuery){
        try{
            this.logger.debug('Generating payment report');
            const reportData = await this.generatePaymentReport.execute(query.reportQuery);

            this.logger.debug('Exporting payment report');
            const reportRequest = {
                report: reportData,
                format: query.exportReport
            }
            return this.exportPaymentReport.execute(reportRequest);
        }catch (e) {
            this.logger.error(e);
            throw e;
        }
    }
}
