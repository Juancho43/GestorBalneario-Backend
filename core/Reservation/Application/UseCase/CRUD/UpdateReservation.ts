import {IUseCase} from '../../../../common/Application/IUseCase';
import {UpdateReservationCommand} from '../../Commands/UpdateReservationCommand';
import {Reservation} from '../../../Model/Reservation';
import {Booking} from '../../../Model/Booking';
import {UpdateReservationDAO} from '../../../Model/DAO/UpdateReservationDAO';
import {EntityNotFoundError} from '../../../../common/Model/Errors/EntityNotFound';
import {GetReservationDAO} from '../../../Model/DAO/GetReservationDAO';
import {GetShadowDAO} from '../../../../Shadow/Model/DAO/GetShadowDAO';
import {Shadow} from '../../../../Shadow/Model/Shadow';

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
    const newDates = Booking.create(
        new Date(request.data.checkIn),
        new Date(request.data.checkOut),
    )
    existingEntity.reschedule(shadow,newDates);

    await this.updateDao.update(existingEntity);
    return existingEntity;
  }
}
