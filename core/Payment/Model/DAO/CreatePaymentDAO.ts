import {Payment} from "../Payment";
import {Invoice} from "../../../Invoice/Model/Invoice";

export interface CreatePaymentDAO{
    save(payment: Payment, invoice: Invoice): Promise<void>;
}