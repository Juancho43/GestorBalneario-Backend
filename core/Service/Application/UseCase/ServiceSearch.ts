import {ServiceResponse} from "../DTO/ServiceResponse";
import {IUseCase} from "../../../common/Application/IUseCase";
import {ServiceSearchQuery} from "../Queries/ServiceSearchQuery";
import {ServiceSearcherDAO} from "../../Model/ServiceSearchDAO";


export class ServiceSearch implements IUseCase<
  ServiceSearchQuery,
  ServiceResponse[]
> {
  constructor(private persistence: ServiceSearcherDAO) {}

  execute(request: ServiceSearchQuery): Promise<ServiceResponse[]> {
    return this.persistence.search(request);
  }
}
