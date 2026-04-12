import { CreateReservation } from '../../core/Reservation/Application/UseCase/CRUD/CreateReservation';
import { CreateReservationCommand } from '../../core/Reservation/Application/Commands/CreateReservationCommand';
import { CreateReservationDAO } from '../../core/Reservation/Model/DAO/CreateReservationDAO';
import { GetClientDAO } from '../../core/Client/Model/DAO/GetClientDAO';
import { GetShadowDAO } from '../../core/Shadow/Model/DAO/GetShadowDAO';
import { EventPublisher } from '../../core/common/Application/EventPublisher';
import { vi } from 'vitest';
import { GetServiceDAO } from '../../core/Service/Model/DAO/GetServiceDAO';
import { UUID } from '../../core/common/Model/UUID';
import { ShadowMother } from '../mothers/ShadowMother';
import { ClientMother } from '../mothers/ClientMother';
import { ServiceMother } from '../mothers/ServiceMother';
import { EntityNotFoundError } from '../../core/common/Model/Errors/EntityNotFound';

describe('CreateReservation UseCase', () => {
  let useCase: CreateReservation;
  let command: CreateReservationCommand;
  let createDao: CreateReservationDAO;
  let getClient: GetClientDAO;
  let getShadow: GetShadowDAO;
  let getService: GetServiceDAO;
  let eventBus: EventPublisher;
  let clientId = UUID.create();
  let shadowId = UUID.create();
  let serviceId = UUID.create();
  beforeEach(() => {
    command = new CreateReservationCommand(
      shadowId.value,
      clientId.value,
      10,
      serviceId.value,
      '2020-01-01',
      '2020-01-30',
    );
    createDao = {
      save: vi.fn().mockResolvedValue(undefined),
    };
    getClient = {
      get: vi.fn().mockResolvedValue(ClientMother.create({ id: clientId })),
    };
    getShadow = {
      get: vi.fn().mockResolvedValue(ShadowMother.create({ id: shadowId })),
    };
    getService = {
      get: vi.fn().mockResolvedValue(ServiceMother.create({ id: serviceId })),
    };
    eventBus = {
      publish: vi.fn().mockResolvedValue(undefined),
    };

    useCase = new CreateReservation(
      createDao,
      getService,
      getShadow,
      getClient,
      eventBus,
    );
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });
  it('should create a new Reservation', async () => {
    const response = await useCase.execute(command);
    expect(response).toBeDefined();
    expect(getClient.get).toHaveBeenCalledWith(command.clientId);
    expect(getShadow.get).toHaveBeenCalledWith(command.shadowId);
    expect(getService.get).toHaveBeenCalledWith(command.serviceId);
    expect(createDao.save).toHaveBeenCalledTimes(1);
    expect(eventBus.publish).toHaveBeenCalledTimes(1);
  });
  it('should throw an error if some entity were not found', async () => {
    getClient.get = vi.fn().mockResolvedValue(null);
    await expect(useCase.execute(command)).rejects.toThrow(EntityNotFoundError);
    getShadow.get = vi.fn().mockResolvedValue(null);
    await expect(useCase.execute(command)).rejects.toThrow(EntityNotFoundError);
    getService.get = vi.fn().mockResolvedValue(null);
    await expect(useCase.execute(command)).rejects.toThrow(EntityNotFoundError);
  });

  it('should publish an event after creating a reservation', async () => {
    const response = await useCase.execute(command);
    expect(eventBus.publish).toHaveBeenCalledWith(
      expect.objectContaining({
        aggregateId: response.id.value,
        clientId: command.clientId,
        serviceId: command.serviceId,
        price: command.price,
        description: expect.any(String),
        date: expect.any(Date),
      }),
    );
  });
});
