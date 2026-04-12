import { GetShadowMap } from '../../../../core/Shadow/Application/UseCase/GetShadowMap';
import { ShadowMapDTO } from '../../../../core/Shadow/Application/Response/ShadowMapDTO';
import { vi } from 'vitest';

describe('GetShadowMap UseCase', () => {
  let useCase: GetShadowMap;
  let mockDao;
  let dto: ShadowMapDTO;
  beforeEach(() => {
    dto = {
      map: [],
    };
    mockDao = {
      get: vi.fn().mockResolvedValue(dto),
    };
    useCase = new GetShadowMap(mockDao);
  });
  it('should be created', () => {
    expect(useCase).toBeDefined();
  });
  it('should return shadow history', async () => {
    const result = await useCase.execute('123');
    expect(mockDao.get).toHaveBeenCalledWith('123');
    expect(result).toEqual(dto);
  });
});
