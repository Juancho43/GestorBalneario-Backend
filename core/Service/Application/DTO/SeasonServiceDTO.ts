import { ServiceResponse } from './ServiceResponse';
/**
 * Data Transfer Object for season services.
 */
export class SeasonServiceDTO {
  /**
   * List of services for a season.
   * @example
   * [
   *   { id: 1, name: 'Service A', description: 'Description for Service A' },
   *   { id: 2, name: 'Service B', description: 'Description for Service B' }
   * ]
   */
  services: ServiceResponse[] = [];

  constructor(services: ServiceResponse[]) {
    this.services = services;
  }
}
