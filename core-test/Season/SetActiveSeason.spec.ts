import {SetActiveSeason} from '../../core/Season/Application/UseCase/SetActiveSeason';
import {vi} from 'vitest';
import {SetActiveSeasonCommand} from '../../core/Season/Application/Commads/SetActiveSeasonCommand';

describe('SetActiveSeason UseCase', () => {
  let useCase: SetActiveSeason;
  let mockDao;
  let command: SetActiveSeasonCommand;
  beforeEach(() => {
    command = new SetActiveSeasonCommand('season-123');
    mockDao = {
      set: vi.fn().mockResolvedValue(undefined),
    };
    useCase = new SetActiveSeason(mockDao);
  });
  it('Should be defined', () => {
    expect(useCase).toBeDefined();
  });
  it('Should set active season', async () => {
    await useCase.execute(command);
    expect(mockDao.set).toHaveBeenCalledWith(command);
  });
});
