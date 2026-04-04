import {CloneSeasonCommand} from "../Commads/CloneSeasonCommand";
import {IUseCase} from "../../../common/Application/IUseCase";
import {CloneSeasonDAO} from "../Interfaces/CloneSeasonDAO";
import {GetSeasonShadowsServicesDAO} from "../Interfaces/GetSeasonShadowsServicesDAO";
import {CloneSeasonDTO} from "../DTO/CloneSeasonDTO";
import {UUID} from "../../../common/Model/UUID";
import {Season} from "../../Model/Season";
import {StringObject} from "../../../common/Model/StringObject";
import {SoftDelete} from "../../../common/Model/SoftDelete";
import {Timestamps} from "../../../common/Model/Timestamps";
import {ShadowResponse} from "../../../Shadow/Application/Response/ShadowResponse";
import {ServiceResponse} from "../../../Service/Application/DTO/ServiceResponse";

export class CloneSeason implements IUseCase<CloneSeasonCommand,void>{
    constructor(
        private persistence: CloneSeasonDAO,
        private seasonsData: GetSeasonShadowsServicesDAO
    ){
    }

    async execute(request: CloneSeasonCommand): Promise<void> {
        const dataToClone = await this.seasonsData.get(request.oldSeasonId);
        const shadows = dataToClone.shadows.map(shadow => shadow.clone());
        const services = dataToClone.services.map(service => service.clone());
        const season = Season.create(
            UUID.create(),
            true,
            new Date(request.newSeason.startDate),
            new Date(request.newSeason.endDate),
            StringObject.create(request.newSeason.name),
            Timestamps.create(),
            SoftDelete.empty()
        )
        const dataReadyToClone = new CloneSeasonDTO();
        dataReadyToClone.season = season;
        dataReadyToClone.services = services;
        dataReadyToClone.shadows = shadows;

        await this.persistence.save(dataReadyToClone);
    }
}