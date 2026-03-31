import {Shadow} from "../../core/Shadow/Model/Shadow";

export class ShadowMother {
    static create(id,season,identifier, type,coords, timestamp, softdelete ){
        return Shadow.create(
            id,
            season,
            identifier,
            type,
            coords,
            timestamp,
            softdelete
        );
    }
}