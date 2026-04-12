import { vi } from 'vitest';
import { DeleteCommand } from '../../core/common/Application/DeleteCommand';
import { EntityNotFoundError } from '../../core/common/Model/Errors/EntityNotFound';
import { ServiceMother } from '../mothers/ServiceMother';
import { DeleteService } from '../../core/Service/Application/UseCase/CRUD/DeleteService';
import { Service } from '../../core/Service/Model/Service';
describe('Delete Service UseCase', () => {
  let useCase: DeleteService;
  let entity: Service;
  let mockDelete;
  let mockGet;
  let command: DeleteCommand;
  beforeEach(() => {
    entity = ServiceMother.create();
    mockGet = {
      get: vi.fn().mockResolvedValue(entity),
    };
    mockDelete = {
      delete: vi.fn().mockResolvedValue(true),
    };
    useCase = new DeleteService(mockDelete, mockGet);
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
