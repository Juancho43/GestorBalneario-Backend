export class Booking {
    private constructor(
        private _checkIn: Date,
        private _checkOut: Date
    ) {}

    public static create(checkIn: Date, checkOut: Date): Booking {
        if (checkOut <= checkIn) {
            throw new Error("Check-out time must be after check-in time.");
        }
        return new Booking(checkIn, checkOut);
    }
    public overlapsWith(other: Booking): boolean {
        return this._checkIn < other.checkOut && other.checkIn < this._checkOut;
    }

    public durationInDays(): number {
        const diff = this._checkOut.getTime() - this._checkIn.getTime();
        return Math.ceil(diff / (1000 * 3600 * 24));
    }
    get checkIn(): Date {
        return this._checkIn;
    }

    get checkOut(): Date {
        return this._checkOut;
    }
}