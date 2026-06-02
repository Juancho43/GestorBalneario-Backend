import {PaginatedQuery} from '../../../common/Application/PaginatedQuery';

export class ReservationSearchQuery extends PaginatedQuery {
    state: string;
    query: string;
    direction: string;
    seasonId: string;
    constructor(page: number, pageSize: number, query: string,seasonId: string, state: string ='ALL' , direction: string = 'ASC') {
        super(page, pageSize);
        this.query = query;
        this.direction = direction;
        this.state = state;
        this.seasonId = seasonId;
    }
}

