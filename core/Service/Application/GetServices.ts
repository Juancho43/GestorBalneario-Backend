import {IUseCase} from "../../common/Application/IUseCase";
import {Service} from "../Model/Service";
import {GetServicesDAO} from "../Model/DAO/GetServicesDAO";

export class GetServices implements IUseCase<void, Service[]>{

    constructor(private dao: GetServicesDAO) {
    }

    async execute(request: void): Promise<Service[]> {
        return await this.dao.get()
    }
}