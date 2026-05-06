import {PaginatedQuery} from '../../../common/Application/PaginatedQuery';

/**
 * Represents a query to get a paginated list of services for a specific season.
 * @extends PaginatedQuery
 */
export class GetSeasonEntityQuery extends PaginatedQuery {
  /**
   * The unique identifier of the season.
   * @example 'f8b4a8a0-5b7d-4e1a-9a0a-7a9b4e2b3c2d'
   */
  seasonId: string;

  /**
   * Creates an instance of GetSeasonServicesQuery.
   * @param {number} page - The page number for pagination. @example 1
   * @param {number} pageSize - The number of items per page. @example 10
   * @param {string} seasonId - The unique identifier of the season. @example 'f8b4a8a0-5b7d-4e1a-9a0a-7a9b4e2b3c2d'
   */
  constructor(page: number, pageSize: number, seasonId: string) {
    super(page, pageSize);
    this.seasonId = seasonId;
  }
}
