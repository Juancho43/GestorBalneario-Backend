import {vi} from 'vitest';
import {EntityNotFoundError} from '../../core/common/Model/Errors/EntityNotFound';
import {UpdateService} from '../../core/Service/Application/UseCase/CRUD/UpdateService';
import {UpdateServiceCommand} from '../../core/Service/Application/Commands/UpdateServiceCommand';
import {Service} from '../../core/Service/Model/Service';
import {ServiceMother} from '../mothers/ServiceMother';
import {CreateServiceCommand} from '../../core/Service/Application/Commands/CreateServiceCommand';

describe('Update Service UseCase', () => {
  let useCase: UpdateService;
  let command: UpdateServiceCommand;
  let entity: Service;
  let getMock;
  let updateMock;
  beforeEach(() => {
    entity = ServiceMother.create();
    getMock = {
      get: vi.fn().mockResolvedValue(entity),
    };
    updateMock = {
      update: vi.fn().mockResolvedValue(undefined),
    };
    useCase = new UpdateService(updateMock, getMock);
    command = new UpdateServiceCommand(
      entity.id.value,
      new CreateServiceCommand(entity.name.getValue(), entity.price.amount),
    );
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('Should be defined', () => {
    expect(useCase).toBeDefined();
  });
  it('Should update the entity', async () => {
    await useCase.execute(command);
    expect(getMock.get).toHaveBeenCalledWith(command.id);
    expect(updateMock.update).toHaveBeenCalledWith(entity);
  });
  it('Should throw an error if the entity does not exist', async () => {
    getMock.get.mockResolvedValue(null);
    await expect(useCase.execute(command)).rejects.toThrow(EntityNotFoundError);
  });
});
