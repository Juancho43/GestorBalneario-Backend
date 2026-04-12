import { ReservationResponse } from './ReservationResponse';
import { ShadowResponse } from '../../../Shadow/Application/Response/ShadowResponse';
import { ClientResponse } from '../../../Client/Application/DTO/ClientResponse';
import { InvoiceResponse } from '../../../Invoice/Application/DTO/InvoiceResponse';
import { PaymentResponse } from '../../../Payment/Application/DTO/PaymentResponse';
/**
 * Represents the detailed response for a reservation, including related entities.
 * @class ReservationDetailResponse
 */
export class ReservationDetailResponse {
  /**
   * The core reservation data.
   * @example
   * {
   *   "id": "r_123",
   *   "date": "2024-07-30T10:00:00Z",
   *   "status": "confirmed"
   * }
   */
  reservation: ReservationResponse;
  /**
   * The associated shadow entity data.
   * @example
   * {
   *   "id": "s_456",
   *   "name": "Shadow Name"
   * }
   */
  shadow: ShadowResponse;
  /**
   * The client who made the reservation.
   * @example
   * {
   *   "id": "c_789",
   *   "name": "John Doe",
   *   "email": "john.doe@example.com"
   * }
   */
  client: ClientResponse;
  /**
   * The invoice associated with the reservation.
   * @example
   * {
   *   "id": "i_101",
   *   "amount": 150.00,
   *   "currency": "USD"
   * }
   */
  invoice: InvoiceResponse;
  /**
   * A list of payments made for the reservation.
   * @example
   * [
   *   {
   *     "id": "p_112",
   *     "amount": 100.00,
   *     "method": "Credit Card"
   *   }
   * ]
   */
  payments: PaymentResponse[];
}
