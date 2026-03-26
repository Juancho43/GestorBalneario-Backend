import {IUseCase} from "../../common/Application/IUseCase";
import {CreateShadowCommand} from "./DTO/CreateShadowCommand";
import {Shadow} from "../Model/Shadow";
import {randomUUID} from "node:crypto";
import {StringObject} from "../../common/Model/StringObject";
import {ShadowType} from "../Model/ValueObjects/ShadowType";
import {ShadowState} from "../Model/ValueObjects/ShadowState";
import {Coords} from "../../common/Model/Coords";
import {PersistShadow} from "../Model/PersistShadow";
import {Timestamps} from "../../common/Model/Timestamps";
import {SoftDelete} from "../../common/Model/SoftDelete";
import {UUID} from "../../common/Model/UUID";
import {CreateShadowDAO} from "../Model/DAO/CreateShadowDAO";

export class CreateShadow implements IUseCase<CreateShadowCommand, Shadow>{

    constructor(private readonly persist: CreateShadowDAO) {
    }
    async execute(request: CreateShadowCommand): Promise<Shadow> {
        const shadow = Shadow.create(
            UUID.create(),
            StringObject.create(request.identifier),
            ShadowType.create(request.type),
            Coords.create(request.coords.x, request.coords.y),
            Timestamps.create(),
            SoftDelete.empty()
        );

        await this.persist.save(shadow);
        return shadow;
    }
}