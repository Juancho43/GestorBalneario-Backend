import {PaymentResponse} from "./PaymentResponse";

/**
 * Data Transfer Object for a payments report.
 */
export class PaymentsReportDTO{
    /**
     * An array of payment responses.
     * @example
     * [
     *   {
     *     id: 'pay_1',
     *     amount: 150.50,
     *     currency: 'USD',
     *     status: 'succeeded',
     *     createdAt: '2023-01-15T10:30:00Z'
     *   }
     * ]
     */
    payments: PaymentResponse[] = [];
    /**
     * The total number of payments in the report.
     * @example 1
     */
    total: number = 0;

}