import {vi} from 'vitest';
import {DeleteCommand} from '../../core/common/Application/DeleteCommand';
import {EntityNotFoundError} from '../../core/common/Model/Errors/EntityNotFound';
import {DeletePayment} from '../../core/Payment/Application/UseCase/CRUD/DeletePayment';
import {Payment} from '../../core/Payment/Model/Payment';
import {PaymentMother} from '../mothers/PaymentMother';

describe('Delete Payment UseCase', () => {
  let useCase: DeletePayment;
  let entity: Payment;
  let mockDelete;
  let mockGet;
  let command: DeleteCommand;
  beforeEach(() => {
    entity = PaymentMother.create();
    mockGet = {
      get: vi.fn().mockResolvedValue(entity),
    };
    mockDelete = {
      delete: vi.fn().mockResolvedValue(true),
    };
    useCase = new DeletePayment(mockDelete, mockGet);
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
