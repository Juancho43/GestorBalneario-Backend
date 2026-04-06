import {ShadowMother} from "./ShadowMother";
import {UUID} from "../../core/common/Model/UUID";
import {ShadowType} from "../../core/Shadow/Model/ValueObjects/ShadowType";
import {Timestamps} from "../../core/common/Model/Timestamps";
import {SoftDelete} from "../../core/common/Model/SoftDelete";
import {StringObject} from "../../core/common/Model/StringObject";
import {Coords} from "../../core/common/Model/Coords";
import {Shadow} from "../../core/Shadow/Model/Shadow";
import {ReservationMother} from "../Reservation/ReservationMother";
import {BookingMother} from "../Reservation/BookingMother";

describe('Shadow Domain Entity',()=>{
    let shadow : Shadow;
    let id:UUID;
    let type: ShadowType;
    let identifier: StringObject;
    let coords:Coords;
    let timestamps:Timestamps;
    let softDelete:SoftDelete;

    beforeAll(()=>{
        id = UUID.create();
        type = ShadowType.create("Carpa");
        identifier = StringObject.create("Carpa 1");
        coords = Coords.create(10,10);
        timestamps = Timestamps.create();
        softDelete = SoftDelete.empty();
        shadow = ShadowMother.create(id,id,identifier,type,coords,timestamps,softDelete);
    })
    it('Should be created',()=>{
        expect(shadow.id).toBe(id);
        expect(shadow.type).toBe(type);
        expect(shadow.identifier).toBe(identifier);
        expect(shadow.coords).toBe(coords);
        expect(shadow.timestamp).toBe(timestamps);
        expect(shadow.softDelete).toBe(softDelete);
    })
    it('should check reservation overlaps',()=>{
        const reservation1 = ReservationMother.create(
            undefined,
            undefined,
            undefined,
            BookingMother.create(new Date('2020-01-01'),new Date('2020-01-30'))
        );
        const reservation2 = ReservationMother.create(
            undefined,
            undefined,
            undefined,
            BookingMother.create(new Date('2020-02-20'),new Date('2020-02-25'))
            );
        shadow.addReservation(reservation1);
        expect(shadow.canBeReserved(reservation2.booking)).toBe(true);
    })
    it('Should not be reserved',()=>{
        const reservation1 = ReservationMother.create(
            undefined,
            undefined,
            undefined,
            BookingMother.create(new Date('2020-01-01'),new Date('2020-01-30'))
        );
        const reservation2 = ReservationMother.create(
            undefined,
            undefined,
            undefined,
            BookingMother.create(new Date('2020-01-20'),new Date('2020-01-25'))
        );
        shadow.addReservation(reservation1);
        expect(shadow.canBeReserved(reservation2.booking)).toBe(false);
    })
    it('Should be reservable',()=>{
        const reservation1 = ReservationMother.create(
            undefined,
            undefined,
            undefined,
            BookingMother.create(new Date('2020-01-01'),new Date('2020-01-30'))
        );
        expect(shadow.canBeReserved(reservation1.booking)).toBe(true);
    })

    it('should have state',()=>{
        expect(shadow.state).toBeDefined();
    })



})