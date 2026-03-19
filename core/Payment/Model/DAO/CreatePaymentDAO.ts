import {Payment} from "../Payment";

export interface CreatePaymentDAO{
    save(payment: Payment): Promise<void>;
}