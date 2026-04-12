import { CreateClient } from '../../core/Client/Application/UseCase/CRUD/CreateClient';
import { Client } from '../../core/Client/Model/Client';
import { ClientMother } from '../mothers/ClientMother';
import { CreateClientCommand } from '../../core/Client/Application/Commands/CreateClientCommand';
import { vi } from 'vitest';

describe('Create Client UseCase', () => {
  let entity: Client;
  let createMock;
  let useCase: CreateClient;
  let command: CreateClientCommand;
  beforeEach(() => {
    entity = ClientMother.create();
    createMock = {
      save: vi.fn().mockResolvedValue(undefined),
    };
    useCase = new CreateClient(createMock);
    command = new CreateClientCommand();
    command.name = entity.name.getValue();
    command.email = entity.email.getValue();
    command.phone = entity.phone.getValue();
  });
  afterEach(() => {
    vi.resetAllMocks();
  });
  it('Should be defined', () => {
    expect(useCase).toBeDefined();
  });
  it('Should create the entity', async () => {
    const result = await useCase.execute(command);
    expect(createMock.save).toHaveBeenCalledWith(result);
  });
});
