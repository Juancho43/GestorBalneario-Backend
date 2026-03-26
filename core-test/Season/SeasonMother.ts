import {Season} from "../../core/Season/Model/Season";
import {UUID} from "../../core/common/Model/UUID";

export class SeasonMother {
    static create(id:UUID, start:Date, end:Date, timestamp, softdelete){
        return Season.create(
            id,
            start,
            end,
            timestamp,
            softdelete
        )
    }
}