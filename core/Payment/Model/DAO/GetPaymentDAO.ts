import {Payment} from "../Payment";

export interface GetPaymentDAO{
    get(id:string): Promise<Payment|null>;
}