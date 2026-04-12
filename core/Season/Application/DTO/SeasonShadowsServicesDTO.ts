import { Season } from '../../Model/Season';
import { Shadow } from '../../../Shadow/Model/Shadow';
import { Service } from '../../../Service/Model/Service';

/**
 * Data Transfer Object for a season with its associated shadows and services.
 * @class SeasonShadowsServicesDTO
 */
export class SeasonShadowsServicesDTO {
  /**
   * The season entity.
   * @example
   * {
   *   "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
   *   "name": "Summer 2024",
   *   "startDate": "2024-06-01T00:00:00.000Z",
   *   "endDate": "2024-08-31T23:59:59.999Z"
   * }
   */
  season: Season;
  /**
   * An array of shadow entities associated with the season.
   * @example
   * [
   *   { "id": "s1", "name": "Shadow 1" },
   *   { "id": "s2", "name": "Shadow 2" }
   * ]
   */
  shadows: Shadow[] = [];
  /**
   * An array of service entities associated with the season.
   * @example
   * [
   *   { "id": "svc1", "name": "Service A", "price": 100 },
   *   { "id": "svc2", "name": "Service B", "price": 150 }
   * ]
   */
  services: Service[] = [];
}
