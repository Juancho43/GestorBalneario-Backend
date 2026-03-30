import {Shadow} from "../../core/Shadow/Model/Shadow";
import {StringObject} from "../../core/common/Model/StringObject";
import {Coords} from "../../core/common/Model/Coords";
import {ShadowType} from "../../core/Shadow/Model/ValueObjects/ShadowType";

export class ShadowMother {
    static create(id,identifier, type,coords, timestamp, softdelete ){
        return Shadow.create(
            id,
            identifier,
            type,
            coords,
            timestamp,
            softdelete
        );
    }
}