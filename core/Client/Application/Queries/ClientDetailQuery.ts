import {PaginatedQuery} from '../../../common/Application/PaginatedQuery';

/**
 * Represents a query for fetching the details of a specific client with pagination.
 * @extends PaginatedQuery
 */
export class ClientDetailQuery extends PaginatedQuery {
  /**
   * The unique identifier for the client.
   * @example 'a1b2c3d4-e5f6-7890-1234-567890abcdef'
   */
  clientId: string;

  /**
   * @param {number} page The current page number.
   * @example 1
   * @param {number} pageSize The number of items to return per page.
   * @example 10
   * @param {string} clientId The unique identifier for the client.
   * @example 'a1b2c3d4-e5f6-7890-1234-567890abcdef'
   */
  constructor(page: number, pageSize: number, clientId: string) {
    super(page, pageSize);
    this.clientId = clientId;
  }
}
