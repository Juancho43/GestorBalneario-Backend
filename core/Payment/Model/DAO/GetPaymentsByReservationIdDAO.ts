import {Payment} from "../Payment";

export interface GetPaymentsByReservationIdDAO{
    get(id: string): Promise<Payment[]>
}