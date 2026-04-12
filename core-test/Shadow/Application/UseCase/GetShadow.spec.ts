import { vi } from 'vitest';
import { Shadow } from '../../../../core/Shadow/Model/Shadow';
import { GetShadow } from '../../../../core/Shadow/Application/UseCase/CRUD/GetShadow';
import { ShadowMother } from '../../../mothers/ShadowMother';
import { GetByIdQuery } from '../../../../core/common/Application/GetByIdQuery';
import { EntityNotFoundError } from '../../../../core/common/Model/Errors/EntityNotFound';

describe('Get Shadow UseCase', () => {
  let entity: Shadow;
  let getMock;
  let useCase: GetShadow;
  let query: GetByIdQuery;
  beforeEach(() => {
    entity = ShadowMother.create();
    query = new GetByIdQuery(entity.id.value);
    getMock = {
      get: vi.fn().mockResolvedValue(entity),
    };
    useCase = new GetShadow(getMock);
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
