import {vi} from 'vitest';
import {Shadow} from '../../../../core/Shadow/Model/Shadow';
import {CreateShadow} from '../../../../core/Shadow/Application/UseCase/CRUD/CreateShadow';
import {Coords, CreateShadowCommand} from '../../../../core/Shadow/Application/Command/CreateShadowCommand';
import {ShadowMother} from '../../../mothers/ShadowMother';
import {Season} from '../../../../core/Season/Model/Season';
import {SeasonMother} from '../../../mothers/SeasonMother';

describe('Create Shadow UseCase', () => {
  let entity: Shadow;
  let season: Season;
  let seasonMock;
  let createMock;
  let useCase: CreateShadow;
  let command: CreateShadowCommand;
  beforeEach(() => {
    season = SeasonMother.create();
    entity = ShadowMother.create();
    createMock = {
      save: vi.fn().mockResolvedValue(undefined),
    };
    seasonMock = {
      get: vi.fn().mockResolvedValue(season),
    };
    let coords:Coords = {
      x: entity.coords.getX(),
      y: entity.coords.getY(),
    }
    useCase = new CreateShadow(createMock, seasonMock);
    command = new CreateShadowCommand(
      entity.identifier.getValue(),
      entity.type.type,
      coords
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
