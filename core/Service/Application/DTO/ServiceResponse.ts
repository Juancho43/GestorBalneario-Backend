import {Service} from "../../Model/Service";

/**
 * Represents the response for a service.
 */
export class ServiceResponse {
    /**
     * The unique identifier of the service.
     * @example "c1b2a3f4-5d6e-7b8c-9d0a-1b2c3d4e5f6a"
     */
    id:string;
    /**
     * The name of the service.
     * @example "Booking a shadow"
     */
    name:string;
    /**
     * The price of the service.
     * @example 25.99
     */
    price:number;
    /**
     * The creation date of the service in ISO 8601 format.
     * @example "2023-01-01T12:00:00.000Z"
     */
    created_at:string;
    /**
     * The last update date of the service in ISO 8601 format.
     * @example "2023-01-02T15:30:00.000Z"
     */
    updated_at:string;
    /**
     * The deletion date of the service in ISO 8601 format. Empty string if not deleted.
     * @example ''
     */
    deleted_at:string;

    /**
     * Creates a ServiceResponse from a Service model.
     * @param {Service} service - The service model.
     * @returns {ServiceResponse}
     */
    static create(service:Service){
        const response = new ServiceResponse();
        response.id = service.id.value;
        response.name = service.name.getValue();
        response.price = service.price.finalAmount;
        response.created_at = service.timestamp.createdAt.toISOString();
        response.updated_at = service.timestamp.updatedAt.toISOString();
        response.deleted_at = service.softDelete.value?.toISOString() || '';
        return response;
    }
    /**
     * Creates a list of ServiceResponses from a list of Service models.
     * @param {Service[]} services - The list of service models.
     * @returns {ServiceResponse[]}
     */
    static createList(services: Service[]){
        return services.map(service => this.create(service));
    }
}