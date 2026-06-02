import {SeasonResponse} from "../DTO/SeasonResponse";
import {IUseCase} from "../../../common/Application/IUseCase";
import {SeasonSearchQuery} from "../Queries/SeasonSearchQuery";
import {SeasonSearchDAO} from "../../Model/DAO/SeasonSearchDAO";


export class SeasonSearch implements IUseCase<
  SeasonSearchQuery,
  SeasonResponse[]
> {
  constructor(private persistence: SeasonSearchDAO) {}

  execute(request: SeasonSearchQuery): Promise<SeasonResponse[]> {
    return this.persistence.search(request);
  }
}
