import {GetByIdQuery} from "../../../common/Application/GetByIdQuery";
import {IUseCase} from "../../../common/Application/IUseCase";
import {SeasonDetailsResponse} from "../DTO/SeasonDetailsResponse";
import {GetSeasonDetailsDAO} from "../Interfaces/GetSeasonDetailsDAO";

export class SeasonDetails implements IUseCase<GetByIdQuery,SeasonDetailsResponse>{

    constructor(private readonly dao: GetSeasonDetailsDAO) {
    }

    execute(request: GetByIdQuery): Promise<SeasonDetailsResponse> {
        return this.dao.get(request);
    }
}