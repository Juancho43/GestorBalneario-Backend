import {IUseCase} from "../../common/Application/IUseCase";
import {GetServiceQuery} from "./DTO/GetServiceQuery";
import {Service} from "../Model/Service";
import {GetServiceDAO} from "../Model/DAO/GetServiceDAO";

export class GetService implements IUseCase<GetServiceQuery, Service>{

    constructor(private dao: GetServiceDAO) {
    }

   async execute(request: GetServiceQuery): Promise<Service> {
        const service = await this.dao.get(request.id);
        if (!service) {
            throw new Error('Service not found');
        }
        return service;
    }
}