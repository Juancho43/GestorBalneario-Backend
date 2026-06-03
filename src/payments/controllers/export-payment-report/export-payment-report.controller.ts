import {Controller, Get, HttpStatus, Query, Res} from '@nestjs/common';
import {ExportPaymentReportService} from "../../services/export-payment-report/export-payment-report.service";
import {ExportReportQuery} from "../../../../core/Payment/Application/Query/ExportReportQuery";
import {PaymentsReportQuery} from "../../../../core/Payment/Application/Query/PaymentsReportQuery";
import type { Response } from 'express';
@Controller('export-payment-report')
export class ExportPaymentReportController {

    constructor(
        private readonly exportService: ExportPaymentReportService
    ) {}

    @Get()
    async exportReport(
        @Query('format') format: string,
        @Query('start') start: string,
        @Query('end') end: string,
        @Query('page') page: number = 0,
        @Query('size') size: number = 10,
        @Query('method') method: string,
        @Res() res: Response
    ) {
        try {
            const requestedFormat = format ? format.toLowerCase() : 'json';

            const query: ExportReportQuery = {
                reportQuery:new PaymentsReportQuery(page, size, start, end, method), // Pass your date ranges or client IDs here from the HTTP Request
                exportReport: requestedFormat
            };

            const content = await this.exportService.execute(query);

            if (requestedFormat === 'csv') {
                res.header('Content-Type', 'text/csv');
                res.attachment('payments_report.csv'); // Triggers the file download
            } else if (requestedFormat === 'html' || requestedFormat === 'print') {
                res.header('Content-Type', 'text/html');
            } else {
                res.header('Content-Type', 'application/json');
            }

            return res.status(HttpStatus.OK).send(content);

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'An error occurred while generating the report',
                error: error.message
            });
        }
    }
}