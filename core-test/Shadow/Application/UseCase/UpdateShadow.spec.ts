import {vi} from 'vitest';
import {UpdateShadowCommand} from '../../../../core/Shadow/Application/Command/UpdateShadowCommand';
import {UpdateShadow} from '../../../../core/Shadow/Application/UseCase/CRUD/UpdateShadow';
import {Shadow} from '../../../../core/Shadow/Model/Shadow';
import {ShadowMother} from '../../../mothers/ShadowMother';
import {Coords, CreateShadowCommand} from '../../../../core/Shadow/Application/Command/CreateShadowCommand';
import {EntityNotFoundError} from '../../../../core/common/Model/Errors/EntityNotFound';
import {Season} from '../../../../core/Season/Model/Season';
import {SeasonMother} from '../../../mothers/SeasonMother';

describe('Update Shadow UseCase', () => {
  let useCase: UpdateShadow;
  let command: UpdateShadowCommand;
  let entity: Shadow;
  let getMock;
  let season: Season;
  let seasonMock;
  let updateMock;
  beforeEach(() => {
    season = SeasonMother.create();
    entity = ShadowMother.create();
    getMock = {
      get: vi.fn().mockResolvedValue(entity),
    };
    updateMock = {
      update: vi.fn().mockResolvedValue(undefined),
    };
    seasonMock = {
      get: vi.fn().mockResolvedValue(season),
    };
    useCase = new UpdateShadow(updateMock, getMock, seasonMock);
    let coords:Coords = {
        x: entity.coords.getX(),
      y: entity.coords.getY(),
    }
    command = new UpdateShadowCommand(
      entity.id.value,
        new CreateShadowCommand(
            entity.identifier.getValue(),
            entity.type.type,
            coords
        ),
    );
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('Should be defined', () => {
    expect(useCase).toBeDefined();
  });
  it('Should update the entity', async () => {
    const result = await useCase.execute(command);
    expect(getMock.get).toHaveBeenCalledWith(command.id);
    expect(updateMock.update).toHaveBeenCalledWith(result);
  });
  it('Should throw an error if the entity does not exist', async () => {
    getMock.get.mockResolvedValue(null);
    await expect(useCase.execute(command)).rejects.toThrow(EntityNotFoundError);
  });
});
