import {vi} from 'vitest';
import {DeleteCommand} from '../../core/common/Application/DeleteCommand';
import {EntityNotFoundError} from '../../core/common/Model/Errors/EntityNotFound';
import {DeleteInvoice} from '../../core/Invoice/Application/UseCase/CRUD/DeleteInvoice';
import {Invoice} from '../../core/Invoice/Model/Invoice';
import {InvoiceMother} from '../mothers/InvoiceMother';

describe('Delete Invoice UseCase', () => {
  let useCase: DeleteInvoice;
  let entity: Invoice;
  let mockDelete;
  let mockGet;
  let command: DeleteCommand;
  beforeEach(() => {
    entity = InvoiceMother.create();
    mockGet = {
      get: vi.fn().mockResolvedValue(entity),
    };
    mockDelete = {
      delete: vi.fn().mockResolvedValue(true),
    };
    useCase = new DeleteInvoice(mockDelete, mockGet);
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
