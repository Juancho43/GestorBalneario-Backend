import {PaymentMethod} from "../../Model/PaymentType";

export class CreatePaymentCommand{
    /** Id of the reservation
     * @example "reservation-123"
     */
    reservationId:string;

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
     * Description of the payment
     * @example 'Some extra details'
     * */
    description?:string;
}