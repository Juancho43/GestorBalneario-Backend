import {IUseCase} from "../../../common/Application/IUseCase";
import {GetActiveSeasonDAO} from "../Interfaces/GetActiveSeasonDAO";
import {SeasonResponse} from "../DTO/SeasonResponse";

export class GetActiveSeason implements IUseCase<null, SeasonResponse>{
    constructor(private dao: GetActiveSeasonDAO) {
    }
    execute(request: null): Promise<SeasonResponse> {
        return this.dao.get();
    }

}