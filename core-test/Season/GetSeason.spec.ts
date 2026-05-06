import {vi} from 'vitest';
import {GetByIdQuery} from '../../core/common/Application/GetByIdQuery';
import {EntityNotFoundError} from '../../core/common/Model/Errors/EntityNotFound';
import {Season} from '../../core/Season/Model/Season';
import {GetSeason} from '../../core/Season/Application/UseCase/CRUD/GetSeason';
import {SeasonMother} from '../mothers/SeasonMother';

describe('Get Season UseCase', () => {
  let entity: Season;
  let getMock;
  let useCase: GetSeason;
  let query: GetByIdQuery;
  beforeEach(() => {
    entity = SeasonMother.create();
    query = new GetByIdQuery(entity.id.value);
    getMock = {
      get: vi.fn().mockResolvedValue(entity),
    };
    useCase = new GetSeason(getMock);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('Should be defined', () => {
    expect(getMock).toBeDefined();
  });
  it('Should get the entity by id', async () => {
    await expect(useCase.execute(query)).resolves.toEqual(entity);
  });
  it('Should fail if the entity does not exist', async () => {
    getMock.get.mockResolvedValue(null);
    query = new GetByIdQuery('fail-123');
    await expect(useCase.execute(query)).rejects.toThrow(EntityNotFoundError);
  });
});
