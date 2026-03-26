import {IUseCase} from "../../common/Application/IUseCase";
import {CreateServiceCommand} from "./DTO/CreateServiceCommand";
import {Service} from "../Model/Service";
import {CreateServiceDAO} from "../Model/DAO/CreateServiceDAO";
import {UUID} from "../../common/Model/UUID";
import {StringObject} from "../../common/Model/StringObject";
import {Money} from "../../Payment/Model/Money";
import {Timestamps} from "../../common/Model/Timestamps";
import {SoftDelete} from "../../common/Model/SoftDelete";

export class CreateService implements IUseCase<CreateServiceCommand, Service>{
    constructor(private dao: CreateServiceDAO) {
    }

    async execute(request: CreateServiceCommand): Promise<Service> {
        const service = Service.create(
            UUID.create(),
            StringObject.create(request.name),
            Money.create(request.price),
            Timestamps.create(),
            SoftDelete.empty()
        )
        await this.dao.create(service)
        return service;
    }

}