import {Payment} from "../../Model/Payment";

export class PaymentResponse{
    /**
     * The unique identifier of the payment.
     * @example 'payment-123'
     * @type {string}
     */
    id:string;
    /**
     * The date of the payment.
     * @example '2026-03-19'
     * @type {string}
     */
    date:string;
    /**
     * The type of the payment.
     * @example 'CASH'
     * @type {string}
     */
    type:string;
    /**
     * The amount of the payment.
     * @example 100
     * @type {number}
     */
    amount:number;
    /**
     * The type of change for the payment.
     * @example 1
     * @type {number}
     */
    changeType:number;
    /**
     * The description of the payment.
     * @example 'Extra details'
     * @type {string}
     */
    description?:string;


    static create(payment: Payment){
        return {
            id:payment.id.value,
            date:payment.date,
            type:payment.type.getValue().toString(),
            amount:payment.money.amount,
            changeType:payment.money.exchangeRate,
            description:payment.description,
            finalAmount:payment.money.finalAmount,
        }
    }
    static createList(payments: Payment[]){
        return payments.map(payment => this.create(payment));
    }
}