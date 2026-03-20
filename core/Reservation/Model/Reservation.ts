import {Booking} from "./Booking";
import {UniqueIdentifier} from "../../common/Model/UniqueIdentifier";
import {Payment} from "../../Payment/Model/Payment";

export class Reservation{
    private _id: UniqueIdentifier;
    private _client: UniqueIdentifier;
    private _shadow: UniqueIdentifier;
    private _payments: UniqueIdentifier[];
    private _booking: Booking;
    private _price: number;

    private constructor(id: UniqueIdentifier,client: UniqueIdentifier, shadow: UniqueIdentifier, booking: Booking, price: number) {
        this._id = id;
        this._client = client;
        this._shadow = shadow;
        this._booking = booking;
        this._price = price;
    }
    public static create(id: UniqueIdentifier,client: UniqueIdentifier, shadow: UniqueIdentifier, booking: Booking, price: number): Reservation {
        if (!client || !shadow || !booking || !price) {
            throw new Error("Invalid reservation data: All fields are required.");
        }
        return new Reservation(id,client, shadow, booking,price);
    }


    /**
     * Calcula el saldo pendiente de la reserva.
     * @param payments - El array de objetos Payment recuperados por el Use Case.
     * @returns El monto que el cliente aún debe pagar.
     */
    public getDebt(payments: Payment[]): number {
        // 1. Filtramos los pagos para asegurarnos de sumar solo los asociados a esta reserva
        const totalPaid = payments
            .filter(p => this._payments.some(id => id.equals(p.id))) // Comparamos Value Objects de ID
            .reduce((sum, p) => sum + p.money.amount, 0);

        const debt = this._price - totalPaid;

        // 3. Retornamos 0 si por alguna razón el pago fue superior (evitamos deudas negativas)
        return debt > 0 ? debt : 0;
    }

    public getStatus(payments: Payment[]) {
        if (this.getDebt(payments) === 0) return 'paid'
        if (this.getDebt(payments) < this._price) return 'partial'
        return 'partial'
    }
    public price():number {
        return this._price;
    }


    /**
     * Calcula la duración total de la reserva en días.
     * Utiliza la lógica del objeto Booking.
     */
    public getDurationInDays(): number {
        const diffTime = Math.abs(this._booking.checkOut.getTime() - this._booking.checkIn.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }



    get id(): UniqueIdentifier {
        return this._id;
    }



    get booking(): Booking {
        return this._booking;
    }
}
