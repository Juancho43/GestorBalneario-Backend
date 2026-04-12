import { vi } from 'vitest';
import { CreateSeasonCommand } from '../../core/Season/Application/Commads/CreateSeasonCommand';
import { Season } from '../../core/Season/Model/Season';
import { CreateSeason } from '../../core/Season/Application/UseCase/CRUD/CreateSeason';
import { SeasonMother } from '../mothers/SeasonMother';

describe('Create Season UseCase', () => {
  let entity: Season;
  let createMock;
  let useCase: CreateSeason;
  let command: CreateSeasonCommand;
  beforeEach(() => {
    entity = SeasonMother.create();
    createMock = {
      save: vi.fn().mockResolvedValue(undefined),
    };
    useCase = new CreateSeason(createMock);
    command = new CreateSeasonCommand();
    command.name = entity.name.getValue();
    command.startDate = entity.startDate.toISOString();
    command.endDate = entity.endDate.toISOString();
    command.isActive = entity.isActive;
  });
  afterEach(() => {
    vi.resetAllMocks();
  });
  it('Should be defined', () => {
    expect(useCase).toBeDefined();
  });
  it('Should create the entity', async () => {
    const result = await useCase.execute(command);
    expect(createMock.save).toHaveBeenCalledWith(result);
  });
});
