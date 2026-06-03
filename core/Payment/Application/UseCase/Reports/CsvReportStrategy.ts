import {ReportStrategy} from "./ReportStrategy";
import {PaymentsReportDTO} from "../../DTO/PaymentsReportDTO";

export class CsvReportStrategy implements ReportStrategy {
    format(report: PaymentsReportDTO): string {
        const headers = ['ID', 'Date', 'Type', 'Amount', 'Change Type', 'Final Amount', 'Invoice ID'];
        const rows = report.payments.map(p =>
            `${p.id},${p.date},${p.type},${p.amount},${p.changeType},${p.finalAmount},${p.invoiceId}`
        );
        rows.push(`TOTAL,,,,,${report.total},`);
        return [headers.join(','), ...rows].join('\n');
    }

    getContentType(): string {
        return 'text/csv';
    }
}