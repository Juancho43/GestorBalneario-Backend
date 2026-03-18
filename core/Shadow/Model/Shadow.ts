import {ShadowType} from "./ValueObjects/ShadowType";
import {Coords} from "../../common/Model/Coords";
import {ShadowState} from "./ValueObjects/ShadowState";
import {StringObject} from "../../common/Model/StringObject";
import {Reservation} from "../../Reservation/Model/Reservation";
import {type} from "node:os";

/**
 * Sombra
 * Carpa-sombrilla
 */
export class Shadow{
    private readonly _id: string;
    private  _identifier: StringObject;
    private  _type: ShadowType;
    private  _state: ShadowState;
    private  _coords: Coords;
    private _currentReservation: Reservation | null = null;

    private constructor(id: string, identifier: StringObject, type: ShadowType, state: ShadowState, coords: Coords) {
        this._id = id;
        this._identifier = identifier;
        this._type = type;
        this._state = state;
        this._coords = coords;
    }

    static create(id:string, identifier: StringObject, type: ShadowType, state: ShadowState, coords: Coords): Shadow {
        return new Shadow(id, identifier, type, state, coords);
    }


    get currentReservation(): Reservation | null {
        return this._currentReservation;
    }

    checkState(date: Date = new Date()){
        if(this._currentReservation){
            console.log('tengo una reserva',this._currentReservation.booking)
            if(!this._currentReservation.isOccupiedOn(date)){
                this._state = ShadowState.create('available')
                console.log('no esta ocupada', this.identifier);
            }

        }
    }


    set currentReservation(value: Reservation) {
        this._currentReservation = value;
    }

    get id(): string {
        return this._id;
    }

    get identifier(): StringObject {
        return this._identifier;
    }

    get type(): ShadowType {
        return this._type;
    }

    get state(): ShadowState {
        return this._state;
    }
    set state(state: ShadowState) {
        this._state = state;
    }
    get coords(): Coords {
        return this._coords;
    }
}