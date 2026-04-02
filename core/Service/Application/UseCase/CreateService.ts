import {IUseCase} from "../../../common/Application/IUseCase";
import {CreateServiceCommand} from "../Commands/CreateServiceCommand";
import {Service} from "../../Model/Service";
import {CreateServiceDAO} from "../../Model/DAO/CreateServiceDAO";
import {UUID} from "../../../common/Model/UUID";
import {StringObject} from "../../../common/Model/StringObject";
import {Money} from "../../../Payment/Model/Money";
import {Timestamps} from "../../../common/Model/Timestamps";
import {SoftDelete} from "../../../common/Model/SoftDelete";
import {ActiveSeason} from "../../../Season/Application/Interfaces/ActiveSeason";

export class CreateService implements IUseCase<CreateServiceCommand, Service>{
    constructor(
        private dao: CreateServiceDAO,
        private currentSeason: ActiveSeason
    ) {
    }

    async execute(request: CreateServiceCommand): Promise<Service> {
        const season = await this.currentSeason.get();
        const service = Service.create(
            UUID.create(),
            season.id,
            StringObject.create(request.name),
            Money.create(request.price),
            Timestamps.create(),
            SoftDelete.empty()
        )
        await this.dao.create(service)
        return service;
    }

}