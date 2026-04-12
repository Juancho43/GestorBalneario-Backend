import { BaseError } from '../BaseError';

export class InvalidDatesError extends BaseError {
  constructor(startDate: Date, endDate: Date) {
    super(
      `Start date ${startDate.toISOString} cannot be after end date ${endDate.toISOString()}`,
      400,
    );
  }
}
