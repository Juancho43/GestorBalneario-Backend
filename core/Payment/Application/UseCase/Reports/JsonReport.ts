import {PaymentsReportDTO} from "../../DTO/PaymentsReportDTO";
import {ReportStrategy} from "./ReportStrategy";

export class JsonReportStrategy implements ReportStrategy {
    format(report: PaymentsReportDTO): string {
        return JSON.stringify(report, null, 2);
    }

    getContentType(): string {
        return 'application/json';
    }
}