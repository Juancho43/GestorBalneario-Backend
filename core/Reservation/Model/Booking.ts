import {InvalidDatesError} from '../../common/Model/Errors/InvalidDates';

export class Booking {
  private constructor(
    private _startDate: Date,
    private _endDate: Date,
  ) {}

  public static create(checkIn: Date, checkOut: Date): Booking {
    if (checkOut <= checkIn) {
      throw new InvalidDatesError(checkIn, checkOut);
    }
    return new Booking(checkIn, checkOut);
  }
  public overlapsWith(other: Booking): boolean {
    return this._startDate < other.endDate && other.startDate < this._endDate;
  }

  public durationInDays(): number {
    const diff = this._endDate.getTime() - this._startDate.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  }
  get startDate(): Date {
    return this._startDate;
  }

  get endDate(): Date {
    return this._endDate;
  }
}
