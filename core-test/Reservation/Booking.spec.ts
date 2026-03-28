import {Booking} from "../../core/Reservation/Model/Booking";

describe('Booking Value Object', () => {

    it('Should be created',()=>{
        const booking = Booking.create(
         new Date('2020-01-02'),
         new Date('2020-01-10')
        );
        expect(booking).toBeTruthy();
        expect(booking.checkIn).toEqual(new Date('2020-01-02'));
        expect(booking.checkOut).toEqual(new Date('2020-01-10'));
        expect(booking.durationInDays()).toEqual(8);
    })

    it('Should check the dates',()=>{
        expect(() => Booking.create(
            new Date('2020-02-02'),
            new Date('2020-01-10')
        )).toThrow();
    })

    it('Should check the booking',()=>{
        const booking = Booking.create(
            new Date('2020-01-02'),
            new Date('2020-01-10')
        );
        const booking2 = Booking.create(
            new Date('2020-01-05'),
            new Date('2020-01-10'),
            )
        const overlap = booking.overlapsWith(booking2);
        expect(overlap).toBe(true);
    })
})