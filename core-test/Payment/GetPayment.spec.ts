import { vi } from 'vitest';
import { GetByIdQuery } from '../../core/common/Application/GetByIdQuery';
import { EntityNotFoundError } from '../../core/common/Model/Errors/EntityNotFound';
import { GetPayment } from '../../core/Payment/Application/UseCase/CRUD/GetPayment';
import { Payment } from '../../core/Payment/Model/Payment';
import { PaymentMother } from '../mothers/PaymentMother';

describe('Get Payment UseCase', () => {
  let entity: Payment;
  let getMock;
  let useCase: GetPayment;
  let query: GetByIdQuery;
  beforeEach(() => {
    entity = PaymentMother.create();
    query = new GetByIdQuery(entity.id.value);
    getMock = {
      get: vi.fn().mockResolvedValue(entity),
    };
    useCase = new GetPayment(getMock);
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
