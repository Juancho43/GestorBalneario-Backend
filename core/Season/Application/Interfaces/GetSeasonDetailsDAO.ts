import {SeasonDetailsResponse} from "../DTO/SeasonDetailsResponse";
import {GetByIdQuery} from "../../../common/Application/GetByIdQuery";

export interface GetSeasonDetailsDAO {
    get(id: GetByIdQuery): Promise<SeasonDetailsResponse>;
}