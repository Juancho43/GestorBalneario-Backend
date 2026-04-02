import {Season} from "../../core/Season/Model/Season";
import {UUID} from "../../core/common/Model/UUID";
import {StringObject} from "../../core/common/Model/StringObject";

export class SeasonMother {
    static create(id:UUID,isActive: boolean, start:Date, end:Date,name: StringObject ,timestamp, softdelete){
        return Season.create(
            id,
            isActive,
            start,
            end,
            name,
            timestamp,
            softdelete
        )
    }
}