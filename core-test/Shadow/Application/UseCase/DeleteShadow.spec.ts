import { vi } from 'vitest';
import { DeleteShadow } from '../../../../core/Shadow/Application/UseCase/CRUD/DeleteShadow';
import { Shadow } from '../../../../core/Shadow/Model/Shadow';
import { ShadowMother } from '../../../mothers/ShadowMother';
import { EntityNotFoundError } from '../../../../core/common/Model/Errors/EntityNotFound';
import { DeleteCommand } from '../../../../core/common/Application/DeleteCommand';
describe('Delete Shadow UseCase', () => {
  let useCase: DeleteShadow;
  let entity: Shadow;
  let mockDelete;
  let mockGet;
  let command: DeleteCommand;
  beforeEach(() => {
    entity = ShadowMother.create();
    mockGet = {
      get: vi.fn().mockResolvedValue(entity),
    };
    mockDelete = {
      delete: vi.fn().mockResolvedValue(true),
    };
    useCase = new DeleteShadow(mockDelete, mockGet);
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
