import {PaginatedQuery} from '../../../common/Application/PaginatedQuery';


export class ClientSearchQuery extends PaginatedQuery {

  query: string;
  orderBy: string;
  direction: string;

  constructor(page: number, pageSize: number, query: string, orderBy: string ='name' , direction: string = 'asc') {
    super(page, pageSize);
    this.query = query;
    this.orderBy = orderBy;
    this.direction = direction;
  }
}

