export class Booking {
    private constructor(
        private _checkIn: Date,
        private _checkOut: Date
    ) {}

    public static create(checkIn: Date, checkOut: Date): Booking {
        const now = new Date();
        console.log('now', now)
        // 1. Validar que el check-in no sea en el pasado


        // 2. Validar que el check-out sea estrictamente posterior al check-in
        if (checkOut <= checkIn) {
            throw new Error("Check-out time must be after check-in time.");
        }

        return new Booking(checkIn, checkOut);
    }

    get checkIn(): Date {
        return this._checkIn;
    }

    get checkOut(): Date {
        return this._checkOut;
    }
}