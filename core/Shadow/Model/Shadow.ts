import {ShadowType} from "./ValueObjects/ShadowType";
import {Coords} from "../../common/Model/Coords";
import {ShadowState} from "./ValueObjects/ShadowState";
import {StringObject} from "../../common/Model/StringObject";

/**
 * Sombra
 * Carpa-sombrilla
 */
export class Shadow{
    private readonly _id: string;
    private readonly _identifier: StringObject;
    private readonly _type: ShadowType;
    private readonly _state: ShadowState;
    private readonly _coords: Coords;

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

    get coords(): Coords {
        return this._coords;
    }
}