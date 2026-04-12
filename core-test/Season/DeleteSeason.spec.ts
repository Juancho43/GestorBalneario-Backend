import { vi } from 'vitest';
import { DeleteCommand } from '../../core/common/Application/DeleteCommand';
import { EntityNotFoundError } from '../../core/common/Model/Errors/EntityNotFound';
import { DeleteSeason } from '../../core/Season/Application/UseCase/CRUD/DeleteSeason';
import { Season } from '../../core/Season/Model/Season';
import { SeasonMother } from '../mothers/SeasonMother';
describe('Delete Season UseCase', () => {
  let useCase: DeleteSeason;
  let entity: Season;
  let mockDelete;
  let mockGet;
  let command: DeleteCommand;
  beforeEach(() => {
    entity = SeasonMother.create();
    mockGet = {
      get: vi.fn().mockResolvedValue(entity),
    };
    mockDelete = {
      delete: vi.fn().mockResolvedValue(true),
    };
    useCase = new DeleteSeason(mockDelete, mockGet);
    command = new DeleteCommand(entity.id.value);
  });
  afterEach(() => {
    vi.fn().mockRestore();
  });
  it('Should be created', () => {
    expect(useCase).toBeDefined();
  });
  it('Should delete the entity', async () => {
    await useCase.execute(command);
    expect(mockGet.get).toHaveBeenCalledWith(command.id);
    expect(mockDelete.delete).toHaveBeenCalledWith(entity);
  });
  it('Should fail if the entity does not exist', async () => {
    command = new DeleteCommand('entity-123');
    mockGet.get.mockResolvedValue(null);
    await expect(useCase.execute(command)).rejects.toThrow(EntityNotFoundError);
  });
});
