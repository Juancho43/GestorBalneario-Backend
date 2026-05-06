import {UUID} from '../../core/common/Model/UUID';
import {SoftDelete} from '../../core/common/Model/SoftDelete';
import {Timestamps} from '../../core/common/Model/Timestamps';
import {BookingMother} from './BookingMother';
import {Reservation} from '../../core/Reservation/Model/Reservation';

export class ReservationMother {
  static create(
    overrides: Partial<{
      id: UUID;
      client: UUID;
      shadow: UUID;
      booking: any;
      timestamp: Timestamps;
      softDelete: SoftDelete;
    }> = {},
  ): Reservation {
    const defaults = {
      id: overrides.id ?? UUID.create(),
      client: overrides.client ?? UUID.create(),
      shadow: overrides.shadow ?? UUID.create(),
      booking: overrides.booking ?? BookingMother.create(),
      timestamp: overrides.timestamp ?? Timestamps.create(),
      softDelete: overrides.softDelete ?? SoftDelete.empty(),
    };

    return Reservation.create(
      defaults.id,
      defaults.client,
      defaults.shadow,
      defaults.booking,
      defaults.timestamp,
      defaults.softDelete,
    );
  }
}
