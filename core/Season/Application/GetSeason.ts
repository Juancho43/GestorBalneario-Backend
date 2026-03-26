import {IUseCase} from "../../common/Application/IUseCase";
import {Season} from "../Model/Season";
import {GetSeasonQuery} from "./DTO/GetSeasonQuery";
import {GetSeasonDAO} from "../Model/DAO/GetSeasonDAO";

export class GetSeason implements IUseCase<GetSeasonQuery,Season> {
    constructor(private dao: GetSeasonDAO) {
    }
    async execute(request: GetSeasonQuery): Promise<Season> {
        const season = await this.dao.get(request.seasonId);
        if(!season) {
            throw new Error(`Season with id ${request.seasonId} not found`);
        }
        return season
    }
}
