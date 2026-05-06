import {GetReservationDetail} from '../../core/Reservation/Application/UseCase/GetReservationDetail';
import {vi} from 'vitest';
import {ReservationDetailResponse} from '../../core/Reservation/Application/DTO/ReservationDetailResponse';

describe('GetReservationDetail useCase', () => {
  let useCase: GetReservationDetail;
  let mockDao;
  let dto: ReservationDetailResponse;
  beforeEach(() => {
    dto = new ReservationDetailResponse();
    mockDao = {
      get: vi.fn().mockResolvedValue(dto),
    };
    useCase = new GetReservationDetail(mockDao);
  });
  it('Should be defined', () => {
    expect(useCase).toBeDefined();
  });
  it('Should return reservation details', async () => {
    const result = await useCase.execute({ id: 'r_123' });
    expect(mockDao.get).toHaveBeenCalledWith('r_123');
    expect(result).toBe(dto);
  });
});
