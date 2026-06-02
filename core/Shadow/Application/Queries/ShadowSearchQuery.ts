import {PaginatedQuery} from '../../../common/Application/PaginatedQuery';

export class ShadowSearchQuery extends PaginatedQuery {
  seasonId: string;
  query: string;
  direction: string;
  state: string;
  type: string;

  constructor(page: number, pageSize: number, query: string = '',seasonId: string,  direction: string = 'ASC', state: string = 'All', type: string = 'All') {
    super(page, pageSize);
    this.query = query;
    this.direction = direction;
    this.state = state;
    this.type = type;
    this.seasonId = seasonId;
  }
}

