import { vi } from 'vitest';
import { EntityNotFoundError } from '../../core/common/Model/Errors/EntityNotFound';
import { UpdateSeasonCommand } from '../../core/Season/Application/Commads/UpdateSeasonCommand';
import { UpdateSeason } from '../../core/Season/Application/UseCase/CRUD/UpdateSeason';
import { Season } from '../../core/Season/Model/Season';
import { SeasonMother } from '../mothers/SeasonMother';
import { CreateSeasonCommand } from '../../core/Season/Application/Commads/CreateSeasonCommand';
describe('Update Season UseCase', () => {
  let useCase: UpdateSeason;
  let command: UpdateSeasonCommand;
  let entity: Season;
  let getMock;
  let updateMock;
  beforeEach(() => {
    entity = SeasonMother.create();
    getMock = {
      get: vi.fn().mockResolvedValue(entity),
    };
    updateMock = {
      update: vi.fn().mockResolvedValue(undefined),
    };
    useCase = new UpdateSeason(updateMock, getMock);
    command = new UpdateSeasonCommand(
      entity.id.value,
      new CreateSeasonCommand('', '', entity.name.getValue(), false),
    );
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('Should be defined', () => {
    expect(useCase).toBeDefined();
  });
  it('Should update the entity', async () => {
    await useCase.execute(command);
    expect(getMock.get).toHaveBeenCalledWith(command.id);
    expect(updateMock.update).toHaveBeenCalledWith(entity);
  });
  it('Should throw an error if the entity does not exist', async () => {
    getMock.get.mockResolvedValue(null);
    await expect(useCase.execute(command)).rejects.toThrow(EntityNotFoundError);
  });
});
