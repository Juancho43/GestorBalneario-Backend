import {PaginatedQuery} from "../../../common/Application/PaginatedQuery";

/**
 * Represents a query to get a paginated list of clients.
 * @extends PaginatedQuery
 */
export class GetClientsQuery extends PaginatedQuery{

    /**
     * Initializes a new instance of the {@link GetClientsQuery} class.
     * @param {number} page - The page number.
     * @example 1
     * @param {number} pageSize - The number of items per page.
     * @example 10
     */
    constructor(page: number, pageSize: number) {
        super(page, pageSize);
    }
}