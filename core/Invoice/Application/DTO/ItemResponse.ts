import {InvoiceItem} from '../../Model/InvoiceItem';
import {ReservationResponse} from '../../../Reservation/Application/DTO/ReservationResponse';

/**
 * Represents the response structure for an invoice item.
 */
export class ItemResponse {
  /**
   * The unique identifier of the invoice item.
   * @example "f47ac10b-58cc-4372-a567-0e02b2c3d479"
   */
  id: string;
  /**
   * The final price of the invoice item.
   * @example 150.75
   */
  price: number;
  /**
   * A description of the invoice item.
   * @example "Standard room for one night"
   */
  description: string;
  /**
   * The ID of the aggregated entity (e.g., Reservation).
   * @example "c3d479f4-7ac1-0b58-cc43-72a5670e02b2"
   */
  aggregatedId: string;
  /**
   * The ID of the service associated with the item.
   * @example "a5670e02-b2c3-d479-f47a-c10b58cc4372"
   */
  serviceId: string;
  /**
   * The type of the aggregate (e.g., 'Reservation').
   * @example "Reservation"
   */
  aggregate: string;
  /**
   * The aggregated object itself, such as a reservation response.
   * @example { id: "c3d479f4-7ac1-0b58-cc43-72a5670e02b2", status: "CONFIRMED" }
   */
  aggregateObject?: ReservationResponse | any;

  /**
   * Creates an ItemResponse from an InvoiceItem entity.
   * @param {InvoiceItem} item - The invoice item entity.
   * @returns {ItemResponse} The created item response.
   */
  static create(item: InvoiceItem): ItemResponse {
    const response = new ItemResponse();
    response.id = item.getId().value;
    response.aggregatedId = item.getAggregateId().value;
    response.aggregate = item.getAggregate();
    response.price = item.getPrice().finalAmount;
    response.serviceId = item.getServiceId().value;
    return response;
  }

  /**
   * Creates a list of ItemResponse objects from a list of InvoiceItem entities.
   * @param {InvoiceItem[]} items - The list of invoice item entities.
   * @returns {ItemResponse[]} The list of created item responses.
   */
  static createList(items: InvoiceItem[]): ItemResponse[] {
    return items.map((item) => {
      return this.create(item);
    });
  }
}
