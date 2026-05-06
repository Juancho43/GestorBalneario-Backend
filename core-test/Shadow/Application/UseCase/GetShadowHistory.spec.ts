import {GetShadowHistory} from '../../../../core/Shadow/Application/UseCase/GetShadowHistory';
import {ShadowHistoryDTO} from '../../../../core/Shadow/Application/Response/ShadowHistoryDTO';
import {ShadowMother} from '../../../mothers/ShadowMother';
import {ShadowResponse} from '../../../../core/Shadow/Application/Response/ShadowResponse';
import {vi} from 'vitest';

describe('GetShadowHistory UseCase', () => {
  let useCase: GetShadowHistory;
  let mockDao;
  let dto: ShadowHistoryDTO;
  beforeEach(() => {
    dto = {
      reservations: [],
      shadow: ShadowResponse.create(ShadowMother.create()),
    };
    mockDao = {
      get: vi.fn().mockResolvedValue(dto),
    };
    useCase = new GetShadowHistory(mockDao);
  });
  it('should be created', () => {
    expect(useCase).toBeDefined();
  });
  it('should return shadow history', async () => {
    const request = {
      id: 'shadow-id',
      page: 1,
      pageSize: 10,
    };
    const result = await useCase.execute(request);
    expect(mockDao.get).toHaveBeenCalledWith(
      request.id,
      request.page,
      request.pageSize,
    );
    expect(result).toEqual(dto);
  });
});
