import { vi } from 'vitest';
import { GetByIdQuery } from '../../core/common/Application/GetByIdQuery';
import { EntityNotFoundError } from '../../core/common/Model/Errors/EntityNotFound';
import { GetSeason } from '../../core/Season/Application/UseCase/CRUD/GetSeason';
import { Service } from '../../core/Service/Model/Service';
import { GetService } from '../../core/Service/Application/UseCase/CRUD/GetService';
import { ServiceMother } from '../mothers/ServiceMother';

describe('Get Service UseCase', () => {
  let entity: Service;
  let getMock;
  let useCase: GetService;
  let query: GetByIdQuery;
  beforeEach(() => {
    entity = ServiceMother.create();
    query = new GetByIdQuery(entity.id.value);
    getMock = {
      get: vi.fn().mockResolvedValue(entity),
    };
    useCase = new GetService(getMock);
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
