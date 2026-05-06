import {DeleteClient} from '../../core/Client/Application/UseCase/CRUD/DeleteClient';
import {Client} from '../../core/Client/Model/Client';
import {ClientMother} from '../mothers/ClientMother';
import {vi} from 'vitest';
import {DeleteCommand} from '../../core/common/Application/DeleteCommand';
import {EntityNotFoundError} from '../../core/common/Model/Errors/EntityNotFound';

describe('Delete Client UseCase', () => {
  let useCase: DeleteClient;
  let client: Client;
  let mockDelete;
  let mockGet;
  let command: DeleteCommand;
  beforeEach(() => {
    client = ClientMother.create();
    mockGet = {
      get: vi.fn().mockResolvedValue(client),
    };
    mockDelete = {
      delete: vi.fn().mockResolvedValue(true),
    };
    useCase = new DeleteClient(mockDelete, mockGet);
    command = new DeleteCommand(client.id.value);
  });
  afterEach(() => {
    vi.fn().mockRestore();
  });
  it('Should be created', () => {
    expect(useCase).toBeDefined();
  });
  it('Should delete the client', async () => {
    await useCase.execute(command);
    expect(mockGet.get).toHaveBeenCalledWith(command.id);
    expect(mockDelete.delete).toHaveBeenCalledWith(client);
  });
  it('Should fail if the client does not exist', async () => {
    command = new DeleteCommand('client-123');
    mockGet.get.mockResolvedValue(null);
    await expect(useCase.execute(command)).rejects.toThrow(EntityNotFoundError);
  });
});
