import {ReservationResponse} from "./ReservationResponse";
import {ShadowResponse} from "../../../Shadow/Application/Response/ShadowResponse";
import {ClientResponse} from "../../../Client/Application/DTO/ClientResponse";
import {InvoiceResponse} from "../../../Invoice/Application/DTO/InvoiceResponse";
import {PaymentResponse} from "../../../Payment/Application/DTO/PaymentResponse";
export class ReservationDetailResponse{

    reservation: ReservationResponse;
    shadow: ShadowResponse;
    client: ClientResponse;
    invoice: InvoiceResponse;
    payments: PaymentResponse[];
}