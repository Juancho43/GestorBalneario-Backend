import {SeasonSearchQuery} from "../../Application/Queries/SeasonSearchQuery";
import {SeasonResponse} from "../../Application/DTO/SeasonResponse";

export interface SeasonSearchDAO{
    search(query: SeasonSearchQuery): Promise<SeasonResponse[]>;
}