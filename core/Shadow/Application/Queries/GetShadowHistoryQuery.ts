import {PaginatedQuery} from '../../../common/Application/PaginatedQuery';

/**
 * Represents a query to get the history of a shadow with pagination.
 * @extends PaginatedQuery
 */
export class GetShadowHistoryQuery extends PaginatedQuery {
  /**
   * The unique identifier of the shadow.
   * @example 'a1b2c3d4-e5f6-7890-1234-567890abcdef'
   */
  id: string;

  /**
   * Creates an instance of GetShadowHistoryQuery.
   * @param {number} page The page number for pagination.
   * @example 1
   * @param {number} pageSize The number of items per page.
   * @example 10
   * @param {string} id The unique identifier of the shadow.
   * @example 'a1b2c3d4-e5f6-7890-1234-567890abcdef'
   */
  constructor(page: number, pageSize: number, id: string) {
    super(page, pageSize);
    this.id = id;
  }
}
