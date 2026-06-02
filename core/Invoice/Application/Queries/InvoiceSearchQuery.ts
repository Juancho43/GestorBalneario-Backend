import {PaginatedQuery} from '../../../common/Application/PaginatedQuery';

export class InvoiceSearchQuery extends PaginatedQuery {
    state: string;
    query: string;
    direction: string;
    orderBy: string;
    seasonId: string;
    constructor(page: number, pageSize: number, query: string,seasonId: string, orderBy: string, state: string ='ALL' , direction: string = 'ASC') {
        super(page, pageSize);
        this.query = query;
        this.direction = direction;
        this.state = state;
        this.orderBy = orderBy;
        this.seasonId = seasonId;
    }
}

