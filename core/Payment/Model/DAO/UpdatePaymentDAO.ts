import {Payment} from "../Payment";

export interface UpdatePaymentDAO{
    save(payment: Payment): Promise<boolean>;
}
