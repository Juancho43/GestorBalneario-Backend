import {IUseCase} from "../../../common/Application/IUseCase";
import {ShadowSearchQuery} from "../Queries/ShadowSearchQuery";
import {ShadowResponse} from "../Response/ShadowResponse";
import {ShadowSearchDAO} from "../../Model/DAO/ShadowSearcherDAO";


export class ShadowSearch implements IUseCase<
  ShadowSearchQuery,
  ShadowResponse[]
> {
  constructor(private persistence: ShadowSearchDAO) {}

  execute(request: ShadowSearchQuery): Promise<ShadowResponse[]> {
    return this.persistence.search(request);
  }
}
