import {PaginatedQuery} from '../../../common/Application/PaginatedQuery';

export class SeasonSearchQuery extends PaginatedQuery {
    orderBy: string;
    query: string;
    direction: string;
    constructor(page: number, pageSize: number, query: string, state: string ='name' , direction: string = 'ASC') {
        super(page, pageSize);
        this.query = query;
        this.direction = direction;
        this.orderBy = state;
    }
}

