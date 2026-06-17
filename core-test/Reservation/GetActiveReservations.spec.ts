import {GetActiveReservations} from '../../core/Reservation/Application/UseCase/GetActiveReservations';
import {Reservation} from '../../core/Reservation/Model/Reservation';
import {vi} from 'vitest';
import {PaginatedQuery} from "../../core/common/Application/PaginatedQuery";

describe('GetActiveReservations useCase', () => {
  let useCase: GetActiveReservations;
  let mockDao;
  let dto: Reservation[] = [];
  let paginatedQuery: PaginatedQuery = new PaginatedQuery(0,10)
  beforeEach(() => {
    mockDao = {
      get: vi.fn().mockResolvedValue(dto),
    };
    useCase = new GetActiveReservations(mockDao);
  });
  it('Should be defined', () => {
    expect(useCase).toBeDefined();
  });
  it('Should return reservation details', async () => {
    const result = await useCase.execute(paginatedQuery);
    expect(mockDao.get).toHaveBeenCalledWith(paginatedQuery);
    expect(result).toBe(dto);
  });
});
