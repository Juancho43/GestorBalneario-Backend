import { PaginatedQuery } from '../../../common/Application/PaginatedQuery';

/**
 * Represents a query to get the current reservations for a specific entity, with pagination.
 */
export class GetCurrentReservationsQuery extends PaginatedQuery {
  // /**
  //  * The unique identifier of the entity for which to retrieve current reservations.
  //  * @example "f8b4g4-g8d8-4f8b-b4b4-f8b4g4g8d8b4"
  //  */
  // seasonId: string;

  /**
   * Creates an instance of GetCurrentReservationsQuery.
   * @param {number} page The page number for pagination.
   * @example 1
   * @param {number} pageSize The number of items per page.
   * @example 10
   * @param {string} id The unique identifier of the entity.
   */
  constructor(page: number, pageSize: number) {
    super(page, pageSize);
  }
}
// TODO: Change to get season's reservations
