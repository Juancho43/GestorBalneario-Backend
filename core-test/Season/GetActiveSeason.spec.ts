import { GetActiveSeason } from '../../core/Season/Application/UseCase/GetActiveSeason';
import { Season } from '../../core/Season/Model/Season';
import { SeasonMother } from '../mothers/SeasonMother';
import { vi } from 'vitest';
describe('GetActiveSeason', () => {
  let useCase: GetActiveSeason;
  let season: Season;
  let mockDao;
  beforeEach(() => {
    season = SeasonMother.create({ isActive: true });
    mockDao = {
      get: vi.fn().mockResolvedValue(season),
    };
    useCase = new GetActiveSeason(mockDao);
  });

  it('Should be defined', () => {
    expect(useCase).toBeDefined();
  });
  it('Should return the active season', async () => {
    const result = await useCase.execute(null);
    expect(result.isActive).toBe(true);
  });
});
