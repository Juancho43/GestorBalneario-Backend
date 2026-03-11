import {IUseCase} from "../../common/Application/IUseCase";
import {CreateShadowCommand} from "./DTO/CreateShadowCommand";
import {Shadow} from "../Model/Shadow";
import {randomUUID} from "node:crypto";
import {StringObject} from "../../common/Model/StringObject";
import {ShadowType} from "../Model/ValueObjects/ShadowType";
import {ShadowState} from "../Model/ValueObjects/ShadowState";
import {Coords} from "../../common/Model/Coords";
import {PersistShadow} from "../Model/PersistShadow";

export class CreateShadow implements IUseCase<CreateShadowCommand, Shadow>{

    constructor(private readonly persist: PersistShadow) {
    }
    async execute(request: CreateShadowCommand): Promise<Shadow> {
        console.log(request)
        const shadow = Shadow.create(
            randomUUID().toString(),
            StringObject.create(request.identifier),
            ShadowType.create(request.type),
            ShadowState.create('active'),
            Coords.create(request.coords.x, request.coords.y),
        );

        await this.persist.save(shadow);
        return shadow;
    }
}