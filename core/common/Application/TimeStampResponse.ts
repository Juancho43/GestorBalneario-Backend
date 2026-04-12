export class TimeStampResponse {
  /**
   * The date and time the client was created.
   * @example "2023-01-01T12:00:00.000Z"
   */
  create_at?: string;
  /**
   * The date and time the client was last updated.
   * @example "2023-01-02T15:30:00.000Z"
   */
  updated_at?: string;
  /**
   * The date and time the client was soft-deleted. Null if not deleted.
   * @example "2023-01-03T10:00:00.000Z"
   */
  deleted_at?: string;
}
