import {IUseCase} from '../../../../common/Application/IUseCase';
import {CreateReservationCommand} from '../../Commands/CreateReservationCommand';
import {Reservation} from '../../../Model/Reservation';
import type {CreateReservationDAO} from '../../../Model/DAO/CreateReservationDAO';
import type {GetClientDAO} from '../../../../Client/Model/DAO/GetClientDAO';
import type {GetShadowDAO} from '../../../../Shadow/Model/DAO/GetShadowDAO';
import {Booking} from '../../../Model/Booking';
import {UUID} from '../../../../common/Model/UUID';
import {Timestamps} from '../../../../common/Model/Timestamps';
import {SoftDelete} from '../../../../common/Model/SoftDelete';
import {EventPublisher} from '../../../../common/Application/EventPublisher';
import {ReservationCreatedEvent} from '../../../Model/Events/ReservationCreatedEvent';
import {GetServiceDAO} from '../../../../Service/Model/DAO/GetServiceDAO';
import {EntityNotFoundError} from '../../../../common/Model/Errors/EntityNotFound';
import {Service} from '../../../../Service/Model/Service';
import {Client} from '../../../../Client/Model/Client';
import {Shadow} from '../../../../Shadow/Model/Shadow';

export class CreateReservation implements IUseCase<
  CreateReservationCommand,
  Reservation
> {
  constructor(
    private dao: CreateReservationDAO,
    private getService: GetServiceDAO,
    private getShadow: GetShadowDAO,
    private getClient: GetClientDAO,
    private publisher: EventPublisher,
  ) {}
  async execute(request: CreateReservationCommand): Promise<Reservation> {
    const [service, client, shadow] = await Promise.all([
      this.getService.get(request.serviceId),
      this.getClient.get(request.clientId),
      this.getShadow.get(request.shadowId),
    ]);

    if (!service) {
      throw new EntityNotFoundError(Service.name, request.serviceId);
    }
    if (!client) {
      throw new EntityNotFoundError(Client.name, request.clientId);
    }
    if (!shadow) {
      throw new EntityNotFoundError(Shadow.name, request.shadowId);
    }
    const reservation = Reservation.create(
      UUID.create(),
      UUID.restore(request.clientId),
      UUID.restore(request.shadowId),
      Booking.create(new Date(request.checkIn), new Date(request.checkOut)),
      Timestamps.create(),
      SoftDelete.empty(),
    );
    shadow.addReservation(reservation);
    await this.dao.save(reservation);
    this.publisher.publish(
      new ReservationCreatedEvent(
        reservation.id.value,
        request.clientId,
        request.serviceId,
        request.price,
        new Date(),
        service.name.getValue(),
      ),
    );
    return reservation;
  }
}
