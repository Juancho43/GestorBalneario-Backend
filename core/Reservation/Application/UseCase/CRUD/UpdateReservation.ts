import { IUseCase } from '../../../../common/Application/IUseCase';
import { UpdateReservationCommand } from '../../Commands/UpdateReservationCommand';
import { Reservation } from '../../../Model/Reservation';
import { Booking } from '../../../Model/Booking';
import { UpdateReservationDAO } from '../../../Model/DAO/UpdateReservationDAO';
import { UUID } from '../../../../common/Model/UUID';
import { EntityNotFoundError } from '../../../../common/Model/Errors/EntityNotFound';
import { GetReservationDAO } from '../../../Model/DAO/GetReservationDAO';
import { GetShadowDAO } from '../../../../Shadow/Model/DAO/GetShadowDAO';
import { Shadow } from '../../../../Shadow/Model/Shadow';
import { NotAvailableDate } from '../../../../Shadow/Model/NotAvailableDate';

export class UpdateReservation implements IUseCase<
  UpdateReservationCommand,
  Reservation
> {
  constructor(
    private readonly updateDao: UpdateReservationDAO,
    private readonly getDao: GetReservationDAO,
    private readonly getShadow: GetShadowDAO,
  ) {}

  async execute(request: UpdateReservationCommand): Promise<Reservation> {
    const [existingEntity, shadow] = await Promise.all([
      this.getDao.get(request.id),
      this.getShadow.get(request.data.shadowId),
    ]);
    if (!existingEntity) {
      throw new EntityNotFoundError(Reservation.name, request.id);
    }
    if (!shadow) {
      throw new EntityNotFoundError(Shadow.name, request.data.shadowId);
    }

    existingEntity.update();
    const reservation = Reservation.create(
      UUID.restore(request.id),
      UUID.restore(request.data.clientId),
      UUID.restore(request.data.shadowId),
      Booking.create(
        new Date(request.data.checkIn),
        new Date(request.data.checkOut),
      ),
      existingEntity.getTimestamps(),
      existingEntity.getSoftDelete(),
    );
    if (!shadow.canBeReserved(reservation.booking)) {
      throw new NotAvailableDate(
        reservation.booking.checkIn.toISOString(),
        reservation.booking.checkOut.toISOString(),
      );
    }
    await this.updateDao.update(reservation);
    return reservation;
  }
}
