import { vi } from 'vitest';
import { Reservation } from '../../core/Reservation/Model/Reservation';
import { Shadow } from '../../core/Shadow/Model/Shadow';
import { ReservationMother } from '../mothers/ReservationMother';
import { ShadowMother } from '../mothers/ShadowMother';
import { UpdateReservation } from '../../core/Reservation/Application/UseCase/CRUD/UpdateReservation';
import { UpdateReservationCommand } from '../../core/Reservation/Application/Commands/UpdateReservationCommand';
import { CreateReservationCommand } from '../../core/Reservation/Application/Commands/CreateReservationCommand';
import { EntityNotFoundError } from '../../core/common/Model/Errors/EntityNotFound';
import { NotAvailableDate } from '../../core/Shadow/Model/NotAvailableDate';
import { BookingMother } from "../../core-test/mothers/BookingMother";

describe('Update reservation UseCase', () => {
  let getShadowMock;
  let getReservationMock;
  let saveMock;
  let useCase: UpdateReservation;
  let reservation: Reservation;
  let shadow: Shadow;
  let command: UpdateReservationCommand;
  beforeEach(() => {
    shadow = ShadowMother.create();
    reservation = ReservationMother.create({ shadow: shadow.id });
    getShadowMock = {
      get: vi.fn().mockResolvedValue(shadow),
    };
    getReservationMock = {
      get: vi.fn().mockResolvedValue(reservation),
    };
    saveMock = {
      update: vi.fn().mockResolvedValue(undefined),
    };
    command = new UpdateReservationCommand(
      reservation.id.value,
      new CreateReservationCommand(
        shadow.id.value,
        reservation.client.value,
        100,
        'service-123',
        new Date('2025-01-10').toISOString(),
        new Date('2025-01-15').toISOString(),
      ),
    );
    useCase = new UpdateReservation(
      saveMock,
      getReservationMock,
      getShadowMock,
    );
  });
  afterEach(() => {
    vi.resetAllMocks();
  });
  it('Should be defined', () => {
    expect(useCase).toBeDefined();
  });
  it('Should Update a reservation', async () => {
    const updatedReservation = await useCase.execute(command);

    expect(getReservationMock.get).toHaveBeenCalledWith(reservation.id.value);
    expect(getShadowMock.get).toHaveBeenCalledWith(reservation.shadow.value);
    expect(saveMock.update).toHaveBeenCalled();
    expect(updatedReservation.booking.checkIn.toISOString()).toBe(
      command.data.checkIn,
    );
    expect(updatedReservation.booking.checkOut.toISOString()).toBe(
      command.data.checkOut,
    );
  });
  it('Should fail if the shadow does not exist', async () => {
    getShadowMock.get.mockResolvedValue(null);
    await expect(useCase.execute(command)).rejects.toThrow(EntityNotFoundError);
  });
  it('Should fail if the reservation does not exist', async () => {
    getReservationMock.get.mockResolvedValue(null);
    await expect(useCase.execute(command)).rejects.toThrow(EntityNotFoundError);
  });
  it('Should fail if new reservation overlaps', async () => {
    const overlappingReservation = ReservationMother.create({
      shadow: shadow.id,
      booking: BookingMother.create({
        checkIn: new Date('2025-01-12'),
        checkOut: new Date('2025-01-18'),
      })
    });
    shadow.addReservation(overlappingReservation);
    shadow.addReservation(reservation);
    getShadowMock.get.mockResolvedValue(shadow);
    command.data.checkIn = new Date('2025-01-12').toISOString();
    command.data.checkOut = new Date('2025-01-18').toISOString();
    await expect(useCase.execute(command)).rejects.toThrow(NotAvailableDate);
  });
});
