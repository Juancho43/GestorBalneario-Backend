import {vi} from 'vitest';
import {GetClient} from '../../core/Client/Application/UseCase/CRUD/GetClient';
import {Client} from '../../core/Client/Model/Client';
import {ClientMother} from '../mothers/ClientMother';
import {GetByIdQuery} from '../../core/common/Application/GetByIdQuery';
import {EntityNotFoundError} from '../../core/common/Model/Errors/EntityNotFound';

describe('Get Client UseCase', () => {
  let entity: Client;
  let getMock;
  let useCase: GetClient;
  let query: GetByIdQuery;
  beforeEach(() => {
    entity = ClientMother.create();
    query = new GetByIdQuery(entity.id.value);
    getMock = {
      get: vi.fn().mockResolvedValue(entity),
    };
    useCase = new GetClient(getMock);
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
