import {vi} from 'vitest';
import {DeleteCommand} from '../../core/common/Application/DeleteCommand';
import {EntityNotFoundError} from '../../core/common/Model/Errors/EntityNotFound';
import {DeleteReservation} from '../../core/Reservation/Application/UseCase/CRUD/DeleteReservation';
import {Reservation} from '../../core/Reservation/Model/Reservation';
import {ReservationMother} from '../mothers/ReservationMother';

describe('Delete Reservation UseCase', () => {
  let useCase: DeleteReservation;
  let entity: Reservation;
  let mockDelete;
  let mockGet;
  let command: DeleteCommand;
  beforeEach(() => {
    entity = ReservationMother.create();
    mockGet = {
      get: vi.fn().mockResolvedValue(entity),
    };
    mockDelete = {
      delete: vi.fn().mockResolvedValue(true),
    };
    useCase = new DeleteReservation(mockDelete, mockGet);
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
