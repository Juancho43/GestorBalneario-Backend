import {PaymentsReportDTO} from "../../../core/Payment/Application/DTO/PaymentsReportDTO";
import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {Injectable} from "@nestjs/common";
import type {PaymentsReportDAO} from "../../../core/Payment/Application/PaymentsReportDAO";
import { PaymentsReportQuery } from "core/Payment/Application/Query/PaymentsReportQuery";
import {PaymentResponse} from "../../../core/Payment/Application/DTO/PaymentResponse";

@Injectable()
export class SqlitePaymentReport extends SqliteBaseClass implements PaymentsReportDAO {
    async get(query: PaymentsReportQuery): Promise<PaymentsReportDTO> {
        const sql = `
            SELECT * FROM payments p
                              INNER JOIN Invoice_Payments ip ON ip.paymentId = p.id
                WHERE p.date BETWEEN @start AND @end AND p.deleted_at IS NULL
                ${query.method !== 'ALL' ? 'AND p.type = @method' : ''}
                LIMIT @limit OFFSET @offset
        `
        const results = this.getDb().prepare(sql).all({
           start: query.start,
           end: query.end,
           method: query.method,
           limit: query.limit,
           offset: query.page * query.limit
        }) as any[];
        const response = new PaymentsReportDTO()

        results.forEach(result => {
            const paymentResponse  = new PaymentResponse();
            paymentResponse.id = result.paymentId;
            paymentResponse.date = result.date;
            paymentResponse.type = result.type;
            paymentResponse.changeType = result.changeType;
            paymentResponse.amount = result.amount;
            paymentResponse.invoiceId = result.invoiceId;
            response.payments.push(paymentResponse);
        })

        response.payments.forEach(p =>{
                response.total += (p.amount * p.changeType);
            }
        )
        return response;
    }
}