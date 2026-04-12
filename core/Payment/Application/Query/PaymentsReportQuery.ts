import { PaginatedQuery } from '../../../common/Application/PaginatedQuery';

/**
 * Represents a query for generating a paginated payments report.
 * @extends PaginatedQuery
 */
export class PaymentsReportQuery extends PaginatedQuery {
  /**
   * The start date for the report period in 'YYYY-MM-DD' format.
   * @example '2023-01-01'
   */
  start: string;
  /**
   * The end date for the report period in 'YYYY-MM-DD' format.
   * @example '2023-12-31'
   */
  end: string;
  /**
   * The payment method to filter the report. Defaults to 'ALL'.
   * @example 'credit_card'
   */
  method: string = 'ALL';

  /**
   * @param {number} page The current page number for pagination.
   * @param {number} pageSize The number of items per page.
   * @param {string} start The start date for the report.
   * @param {string} end The end date for the report.
   * @param {string} method The payment method to filter by.
   */
  constructor(
    page: number,
    pageSize: number,
    start: string,
    end: string,
    method: string,
  ) {
    super(page, pageSize);
    this.start = start;
    this.end = end;
    this.method = method;
  }
}
