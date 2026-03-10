export class Booking {
    private constructor(
        private _startDate: Date,
        private _endDate: Date,
        private _checkIn: Date,
        private _checkOut: Date
    ) {}

    public static create(startDate: Date, endDate: Date, checkIn: Date, checkOut: Date): Booking {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // 1. Validar que la fecha de inicio no sea en el pasado
        if (startDate < today) {
            throw new Error("The start date cannot be in the past.");
        }

        // 2. Validar que la fecha de fin sea posterior a la de inicio
        if (endDate < startDate) {
            throw new Error("The end date must be after the start date.");
        }

        // 3. Validar consistencia de check-in y check-out
        if (checkIn >= checkOut) {
            throw new Error("Check-out time must be after check-in time.");
        }

        return new Booking(startDate, endDate, checkIn, checkOut);
    }

    get startDate(): Date {
        return this._startDate;
    }

    get endDate(): Date {
        return this._endDate;
    }

    get checkIn(): Date {
        return this._checkIn;
    }

    get checkOut(): Date {
        return this._checkOut;
    }
}