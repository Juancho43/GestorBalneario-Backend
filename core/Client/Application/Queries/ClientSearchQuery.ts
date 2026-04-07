import {PaginatedQuery} from "../../../common/Application/PaginatedQuery";

/**
 * Represents a query for searching clients with pagination.
 * @example
 * const query = new ClientSearchQuery(1, 10, "John Doe");
 */
export class ClientSearchQuery extends PaginatedQuery{
    /**
     * The search term to filter clients.
     * @example "John Doe"
     */
    query: string;
    constructor(page: number, pageSize: number, query: string) {
        super(page, pageSize);
        this.query = query;
    }
}