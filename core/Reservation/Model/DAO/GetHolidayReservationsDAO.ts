import {Reservation} from "../Reservation";

export interface GetHolidayReservationsDAO{
    get(holidayId: string): Promise<Reservation[]>;
}