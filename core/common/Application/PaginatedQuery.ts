/**
 * Represents a query for a paginated list of items.
 * @example
 * const query = new PaginatedQuery(0, 10);
 */
export class PaginatedQuery {
  /**
   * The page number, starting from 0.
   * @example 0
   */
  page: number;
  /**
   * The number of items to return per page.
   * @example 10
   */
  pageSize: number;

  /**
   * Creates an instance of PaginatedQuery.
   * @param {number} page The page number, starting from 0.
   * @param {number} pageSize The number of items to return per page.
   */
  constructor(page: number, pageSize: number) {
    this.page = page;
    this.pageSize = pageSize;
  }
}
