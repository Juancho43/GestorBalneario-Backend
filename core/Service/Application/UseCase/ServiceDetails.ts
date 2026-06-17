import {GetByIdQuery} from "../../../common/Application/GetByIdQuery";
import {IUseCase} from "../../../common/Application/IUseCase";
import {ServiceDetailsResponse} from "../DTO/ServiceDetailsResponse";
import {GetServiceDetailsDAO} from "../Interfaces/GetServicesDetailsDAO";

export class ServiceDetails implements IUseCase<GetByIdQuery,ServiceDetailsResponse>{

    constructor(private readonly dao: GetServiceDetailsDAO) {
    }

   async execute(request: GetByIdQuery): Promise<ServiceDetailsResponse> {
        return await this.dao.get(request);
    }
}