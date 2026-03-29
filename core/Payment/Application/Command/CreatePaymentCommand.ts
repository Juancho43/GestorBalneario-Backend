import {PaymentMethod} from "../../Model/PaymentType";
import {Currency} from "../../Model/Money";

export class CreatePaymentCommand{
    /** Id of the invoices
     * @example "invoices-123"
     */
    invoiceId:string;

    /** Total amount of the payment
     *  @example 100.50
     */
    amount:number;

    /**
     * Date of the payment
     * @example '2026-03-19'
     * */
    date:Date;

    /**
     * Amount of type of change
     * @example 1
     * */
    changeType:number;
    /**
     * Type of the payment
     * @example 'CASH'
     * */
    type:PaymentMethod;


    /**
     * Currency of the payment
     * @example 'ARS'
     * */
    currency:Currency;

    /**
     * Description of the payment
     * @example 'Some extra details'
     * */
    description?:string;
}