import { ReservationResponse } from '../../../Reservation/Application/DTO/ReservationResponse';
import { ShadowResponse } from './ShadowResponse';

/**
 * Data Transfer Object for a shadow's history.
 */
export class ShadowHistoryDTO {
  /**
   * The shadow projection.
   * @example
   * {
   *  "id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
   *  "name": "Shadow Name",
   *  "email": "shadow@example.com"
   * }
   */
  shadow: ShadowResponse;
  /**
   * The list of reservations for the shadow.
   * @example
   * [
   *  {
   *    "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
   *    "startDate": "2023-01-01T00:00:00.000Z",
   *    "endDate": "2023-01-01T02:00:00.000Z",
   *    "user": { "id": "...", "name": "John Doe" }
   *  }
   * ]
   */
  reservations: ReservationResponse[];
}
