import { UpdateClient } from '../../core/Client/Application/UseCase/CRUD/UpdateClient';
import { UpdateClientCommand } from '../../core/Client/Application/Commands/UpdateClientCommand';
import { Client } from '../../core/Client/Model/Client';
import { ClientMother } from '../mothers/ClientMother';
import { vi } from 'vitest';
import { CreateClientCommand } from '../../core/Client/Application/Commands/CreateClientCommand';
import { EntityNotFoundError } from '../../core/common/Model/Errors/EntityNotFound';
describe('Update Client UseCase', () => {
  let useCase: UpdateClient;
  let command: UpdateClientCommand;
  let entity: Client;
  let getMock;
  let updateMock;
  beforeEach(() => {
    entity = ClientMother.create();
    getMock = {
      get: vi.fn().mockResolvedValue(entity),
    };
    updateMock = {
      update: vi.fn().mockResolvedValue(undefined),
    };
    useCase = new UpdateClient(updateMock, getMock);
    command = new UpdateClientCommand(
      entity.id.value,
      new CreateClientCommand(
        entity.name.getValue(),
        entity.email.getValue(),
        entity.phone.getValue(),
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
    await useCase.execute(command);
    expect(getMock.get).toHaveBeenCalledWith(command.id);
    expect(updateMock.update).toHaveBeenCalledWith(entity);
  });
  it('Should throw an error if the entity does not exist', async () => {
    getMock.get.mockResolvedValue(null);
    await expect(useCase.execute(command)).rejects.toThrow(EntityNotFoundError);
  });
});
