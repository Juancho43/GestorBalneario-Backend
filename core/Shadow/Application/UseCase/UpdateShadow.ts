import {IUseCase} from "../../../common/Application/IUseCase";
import {Shadow} from "../../Model/Shadow";
import {UpdateShadowCommand} from "../Command/UpdateShadowCommand";
import {StringObject} from "../../../common/Model/StringObject";
import {ShadowType} from "../../Model/ValueObjects/ShadowType";
import {Coords} from "../../../common/Model/Coords";
import {Timestamps} from "../../../common/Model/Timestamps";
import {SoftDelete} from "../../../common/Model/SoftDelete";
import {UUID} from "../../../common/Model/UUID";
import {UpdateShadowDAO} from "../../Model/DAO/UpdateShadowDAO";
import {ActiveSeasonDAO} from "../../../Season/Application/Interfaces/ActiveSeasonDAO";

export class UpdateShadow implements IUseCase<UpdateShadowCommand, Shadow>{

    constructor(
        private readonly persist: UpdateShadowDAO,
        private readonly currentSeason: ActiveSeasonDAO,
    ) {}

    async execute(request: UpdateShadowCommand): Promise<Shadow> {
        const season = await this.currentSeason.get();
        const shadow = Shadow.create(
            UUID.restore(request.id),
            season.id,
            StringObject.create(request.data.identifier),
            ShadowType.create(request.data.type),
            Coords.create(request.data.coords.x, request.data.coords.y),
            Timestamps.create(new Date(request.createdAt)).update(),
            SoftDelete.empty(),
        );
        const result = await this.persist.update(shadow);
        if (!result){
            throw new Error("Shadow not found");
        }
        return shadow;
    }

}