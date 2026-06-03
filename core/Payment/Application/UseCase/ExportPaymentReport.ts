import {IUseCase} from "../../../common/Application/IUseCase";
import {PaymentsReportDTO} from "../DTO/PaymentsReportDTO";
import {ReportStrategyFactory} from "./ReportStrategyFactory";

export type ExportReportRequest = { report: PaymentsReportDTO, format: string };

export class ExportPaymentReport implements IUseCase<ExportReportRequest, string> {

    constructor(private factory: ReportStrategyFactory) {}

    async execute(request: ExportReportRequest): Promise<string> {
        const strategy = this.factory.getStrategy(request.format);
        return strategy.format(request.report);
    }
}