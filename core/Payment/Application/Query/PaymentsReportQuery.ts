export class PaymentsReportQuery {
    start: string;
    end: string;
    page: number = 0;
    limit: number = 10;
    method: string = 'ALL';


    constructor(start: string, end: string, page: number, limit: number, method: string) {
        this.start = start;
        this.end = end;
        this.page = page;
        this.limit = limit;
        this.method = method;
    }
}