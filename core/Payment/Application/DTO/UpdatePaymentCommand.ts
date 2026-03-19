import {CreatePaymentCommand} from "./CreatePaymentCommand";

export class UpdatePaymentCommand{
    /**
     * Payment id to update
     * */
    id:string;
    data: CreatePaymentCommand;
}