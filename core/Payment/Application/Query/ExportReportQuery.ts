import {PaymentsReportQuery} from "./PaymentsReportQuery";

export class ExportReportQuery {

    constructor(public reportQuery: PaymentsReportQuery, public exportReport: string) {
    }
}