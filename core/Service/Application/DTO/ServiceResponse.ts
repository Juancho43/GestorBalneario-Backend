import {Service} from '../../Model/Service';
import {TimeStampResponse} from '../../../common/Application/TimeStampResponse';

/**
 * Represents the response for a service.
 * @example
 * {
 *   "id": "c1b2a3f4-5d6e-7b8c-9d0a-1b2c3d4e5f6a",
 *   "name": "Booking a shadow",
 *   "price": 25.99,
 *   "create_at": "2023-01-01T12:00:00.000Z",
 *   "updated_at": "2023-01-01T12:00:00.000Z",
 *   "deleted_at": ""
 * }
 */
export class ServiceResponse extends TimeStampResponse {
  /**
   * The unique identifier of the service.
   * @example "c1b2a3f4-5d6e-7b8c-9d0a-1b2c3d4e5f6a"
   */
  id: string;
  /**
   * The name of the service.
   * @example "Booking a shadow"
   */
  name: string;
  /**
   * The price of the service.
   * @example 25.99
   */
  price: number;
  type: string;
  /**
   * Creates a ServiceResponse from a Service model.
   * @param {Service} service - The service model.
   * @returns {ServiceResponse} A new ServiceResponse instance.
   */
  static create(service: Service): ServiceResponse {
    const response = new ServiceResponse();
    response.id = service.id.value;
    response.name = service.name.getValue();
    response.price = service.price.finalAmount;
    response.type = service.type.getValue();
    response.create_at = service.timestamp.createdAt.toISOString();
    response.updated_at = service.timestamp.updatedAt.toISOString();
    response.deleted_at = service.softDelete.value?.toISOString() || '';
    return response;
  }
  /**
   * Creates a list of ServiceResponses from a list of Service models.
   * @param {Service[]} services - The list of service models.
   * @returns {ServiceResponse[]} An array of ServiceResponse instances.
   */
  static createList(services: Service[]): ServiceResponse[] {
    return services.map((service) => this.create(service));
  }
}
