import {Invoice} from '../../Model/Invoice';
import {ItemResponse} from './ItemResponse';
import {TimeStampResponse} from '../../../common/Application/TimeStampResponse';

/**
 * Represents the response structure for an invoice.
 * @extends TimeStampResponse
 */
export class InvoiceResponse extends TimeStampResponse {
  /**
   * The unique identifier of the invoice.
   * @example 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
   */
  id: string;
  /**
   * The date of the invoice in ISO format.
   * @example '2023-01-15T14:30:00.000Z'
   */
  date: string;
  /**
   * The list of items in the invoice.
   * @example [{ "name": "Item 1", "quantity": 2, "price": 10.50 }]
   */
  items: ItemResponse[];
  /**
   * The total amount of the invoice.
   * @example 150.75
   */
  amount: number;
  /**
   * The identifier of the client associated with the invoice.
   * @example 'c47ac10b-58cc-4372-a567-0e02b2c3d479'
   */
  clientId: string;
  /**
   * The state of the invoice (e.g., 'pending', 'paid', 'cancelled').
   * @example 'paid'
   */
  state: string;
  clientName: string;
  /**
   * Creates an InvoiceResponse from an Invoice domain model.
   * @param {Invoice} invoice - The invoice entity.
   * @returns {InvoiceResponse} A new InvoiceResponse object.
   */
  static create(invoice: Invoice) {
    const response = new InvoiceResponse();
    response.id = invoice.id.value;
    response.date = invoice.date.toISOString();
    response.amount = invoice.amount.finalAmount;
    response.clientId = invoice.clientId.value;
    response.state = invoice.state.toString();
    response.items = ItemResponse.createList(invoice.items);
    response.create_at = invoice.timestamps.createdAt.toISOString();
    response.updated_at = invoice.timestamps.updatedAt.toISOString();
    return response;
  }

  /**
   * Creates a list of InvoiceResponse objects from a list of Invoice domain models.
   * @param {Invoice[]} invoices - An array of invoice entities.
   * @returns {InvoiceResponse[]} An array of InvoiceResponse objects.
   */
  static createList(invoices: Invoice[]) {
    return invoices.map((invoice) => this.create(invoice));
  }
}
