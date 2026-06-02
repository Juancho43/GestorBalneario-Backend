import {PaginatedQuery} from '../../../common/Application/PaginatedQuery';

export class ServiceSearchQuery extends PaginatedQuery {
    orderBy: string;
    query: string;
    direction: string;
    seasonId: string;
    constructor(page: number, pageSize: number, query: string,seasonId: string, orderBy: string ='created_at' , direction: string = 'ASC') {
        super(page, pageSize);
        this.query = query;
        this.direction = direction;
        this.orderBy = orderBy;
        this.seasonId = seasonId;
    }
}

