import { GetActiveReservations } from '../../core/Reservation/Application/UseCase/GetActiveReservations';
import { Reservation } from '../../core/Reservation/Model/Reservation';
import { vi } from 'vitest';
describe('GetActiveReservations useCase', () => {
  let useCase: GetActiveReservations;
  let mockDao;
  let dto: Reservation[] = [];
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
    const result = await useCase.execute(null);
    expect(mockDao.get).toHaveBeenCalledWith();
    expect(result).toBe(dto);
  });
});
