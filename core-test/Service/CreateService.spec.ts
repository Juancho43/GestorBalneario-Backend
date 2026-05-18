import {vi} from 'vitest';
import {CreateService} from '../../core/Service/Application/UseCase/CRUD/CreateService';
import {Service} from '../../core/Service/Model/Service';
import {CreateServiceCommand} from '../../core/Service/Application/Commands/CreateServiceCommand';
import {ServiceMother} from '../mothers/ServiceMother';
import {Season} from '../../core/Season/Model/Season';
import {SeasonMother} from '../mothers/SeasonMother';

describe('Create Service UseCase', () => {
  let entity: Service;
  let season: Season;
  let seasonMock;
  let createMock;
  let useCase: CreateService;
  let command: CreateServiceCommand;
  beforeEach(() => {
    season = SeasonMother.create();
    entity = ServiceMother.create();
    createMock = {
      save: vi.fn().mockResolvedValue(undefined),
    };
    seasonMock = {
      get: vi.fn().mockResolvedValue(season),
    };
    useCase = new CreateService(createMock, seasonMock);
    command = new CreateServiceCommand(
        entity.name.getValue(),
        entity.price.amount,
        entity.type.getValue(),
    );
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
