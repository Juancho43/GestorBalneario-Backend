import {IUseCase} from "../../common/Application/IUseCase";
import {CreateSeasonCommand} from "./DTO/CreateSeasonCommand";
import {Season} from "../Model/Season";
import {CreateSeasonDAO} from "../Model/DAO/CreateSeasonDAO";
import {UUID} from "../../common/Model/UUID";
import {SoftDelete} from "../../common/Model/SoftDelete";
import {Timestamps} from "../../common/Model/Timestamps";

export class CreateSeason implements IUseCase<CreateSeasonCommand, Season>{
    constructor(private dao: CreateSeasonDAO) {
    }
    async execute(request: CreateSeasonCommand): Promise<Season> {
        const season = Season.create(
            UUID.create(),
            new Date(request.startDate),
            new Date(request.endDate),
            Timestamps.create(),
            SoftDelete.empty()
        )
        await this.dao.create(season);
        return season;
    }

}