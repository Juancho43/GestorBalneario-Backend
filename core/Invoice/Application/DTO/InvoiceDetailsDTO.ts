import { ItemResponse } from './ItemResponse';
import { ClientResponse } from '../../../Client/Application/DTO/ClientResponse';
import { PaymentResponse } from '../../../Payment/Application/DTO/PaymentResponse';
import { InvoiceResponse } from './InvoiceResponse';

/**
 * Represents the detailed data transfer object for an invoice.
 */
export class InvoiceDetailsDTO {
  /**
   * The main invoice data.
   * @example
   * {
   *   "id": "inv_123",
   *   "invoiceNumber": "2024-001",
   *   "date": "2024-07-30T10:00:00Z",
   *   "total": 150.00
   * }
   */
  invoice: InvoiceResponse;
  /**
   * A list of items included in the invoice.
   * @example
   * [
   *   { "id": "item_456", "description": "Product A", "quantity": 2, "price": 50.00 },
   *   { "id": "item_789", "description": "Service B", "quantity": 1, "price": 50.00 }
   * ]
   */
  items: ItemResponse[] = [];
  /**
   * The client associated with the invoice.
   * @example
   * {
   *   "id": "client_abc",
   *   "name": "John Doe",
   *   "email": "john.doe@example.com"
   * }
   */
  client: ClientResponse;
  /**
   * A list of payments made for the invoice.
   * @example
   * [
   *   { "id": "pay_xyz", "amount": 100.00, "date": "2024-07-31T14:00:00Z", "method": "Credit Card" }
   * ]
   */
  payments: PaymentResponse[] = [];
}
