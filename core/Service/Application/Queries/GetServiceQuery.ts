/**
 * Represents a query to retrieve a specific service by its identifier.
 */
export class GetServiceQuery {
  /**
   * Initializes a new instance of the GetServiceQuery class.
   * @param id The unique identifier of the service to retrieve.
   * @example 'a1b2c3d4-e5f6-7890-1234-567890abcdef'
   */
  constructor(public id: string) {}
}
