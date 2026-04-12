import { vi } from 'vitest';
import { GetByIdQuery } from '../../core/common/Application/GetByIdQuery';
import { EntityNotFoundError } from '../../core/common/Model/Errors/EntityNotFound';
import { GetReservation } from '../../core/Reservation/Application/UseCase/CRUD/GetReservation';
import { Reservation } from '../../core/Reservation/Model/Reservation';
import { ReservationMother } from '../mothers/ReservationMother';

describe('Get Reservation UseCase', () => {
  let entity: Reservation;
  let getMock;
  let useCase: GetReservation;
  let query: GetByIdQuery;
  beforeEach(() => {
    entity = ReservationMother.create();
    query = new GetByIdQuery(entity.id.value);
    getMock = {
      get: vi.fn().mockResolvedValue(entity),
    };
    useCase = new GetReservation(getMock);
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
