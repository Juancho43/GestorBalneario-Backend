import {PaymentsReportDTO} from "../../DTO/PaymentsReportDTO";

export interface ReportStrategy {
    format(report: PaymentsReportDTO): string;
    getContentType(): string;
}