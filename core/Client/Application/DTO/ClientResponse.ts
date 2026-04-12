import { Client } from '../../Model/Client';
import { TimeStampResponse } from '../../../common/Application/TimeStampResponse';
/**
 * @class ClientResponse
 * @description Represents the response format for a client.
 */
export class ClientResponse extends TimeStampResponse {
  /**
   * Unique identifier for the client.
   * @example "c7a4f2d4-4f2a-4a2a-8f2a-4f2a4a2a4f2a"
   */
  id: string;
  /**
   * Client's full name.
   * @example "Juan Bravo"
   */
  name: string;
  /**
   * Client's phone number.
   * @example "+1-555-123-4567"
   */
  phone: string;
  /**
   * Client's email address.
   * @example "client@example.com"
   */
  email: string;

  /**
   * Creates a ClientResponse object from a Client model.
   * @param {Client} client - The client model instance.
   * @returns {ClientResponse} A plain object representing the client response.
   */
  static create(client: Client): ClientResponse {
    return {
      id: client.id.value,
      name: client.name.getValue(),
      phone: client.phone.getValue(),
      email: client.email.getValue(),
      create_at: client.timestamp.createdAt.toISOString(),
      updated_at: client.timestamp.updatedAt.toISOString(),
      deleted_at: client.softDelete.value?.toISOString(),
    };
  }

  /**
   * Creates a list of ClientResponse objects from a list of Client models.
   * @param {Client[]} clients - An array of client model instances.
   * @returns {ClientResponse[]} An array of plain objects representing the client responses.
   */
  static createList(clients: Client[]): ClientResponse[] {
    return clients.map((client) => {
      return this.create(client);
    });
  }
}
