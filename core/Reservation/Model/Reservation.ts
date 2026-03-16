import {Client} from "../../Client/Model/Client";
import {Shadow} from "../../Shadow/Model/Shadow";
import {Booking} from "./Booking";

export class Reservation{
    private _id: string;
    private _client: Client;
    private _shadow: Shadow;
    private _booking: Booking;

    private constructor(id: string,client: Client, shadow: Shadow, booking: Booking) {
        this._id = id;
        this._client = client;
        this._shadow = shadow;
        this._booking = booking;
    }
    public static create(id:string, client: Client, shadow: Shadow, booking: Booking): Reservation {
        if (!client || !shadow || !booking) {
            throw new Error("Invalid reservation data: All fields are required.");
        }
        return new Reservation(id,client, shadow, booking);
    }


    /**
     * Calcula la duración total de la reserva en días.
     * Utiliza la lógica del objeto Booking.
     */
    public getDurationInDays(): number {
        const diffTime = Math.abs(this._booking.checkOut.getTime() - this._booking.checkIn.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    /**
     * Verifica si la reserva está activa en una fecha dada.
     */
    public isOccupiedOn(date: Date): boolean {
        return date >= this._booking.checkIn && date <= this._booking.checkOut;
    }

    /**
     * Permite actualizar la reserva, por ejemplo, cambiando las fechas.
     * Napoleon Hill diría que el cambio es inevitable; asegúrate de que sea controlado.
     */
    public reschedule(newBooking: Booking): void {
        // Aquí podrías agregar validaciones de disponibilidad extra
        this._booking = newBooking;
    }

    get id(): string {
        return this._id;
    }

    get client(): Client {
        return this._client;
    }

    get shadow(): Shadow {
        return this._shadow;
    }

    get booking(): Booking {
        return this._booking;
    }
}
