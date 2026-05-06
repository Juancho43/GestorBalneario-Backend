import {PaginatedQuery} from '../../../common/Application/PaginatedQuery';

export class GetSeasonsHistoryQuery extends PaginatedQuery {
  constructor(page: number, pageSize: number) {
    super(page, pageSize);
  }
}
