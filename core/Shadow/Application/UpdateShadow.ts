import {IUseCase} from "../../common/Application/IUseCase";
import {Shadow} from "../Model/Shadow";
import {UpdateShadowCommand} from "./DTO/UpdateShadowCommand";
import {PersistShadow} from "../Model/PersistShadow";
import {StringObject} from "../../common/Model/StringObject";
import {ShadowType} from "../Model/ValueObjects/ShadowType";
import {ShadowState} from "../Model/ValueObjects/ShadowState";
import {Coords} from "../../common/Model/Coords";

export class UpdateShadow implements IUseCase<UpdateShadowCommand, Shadow>{

    constructor(private readonly persist: PersistShadow) {}

    async execute(request: UpdateShadowCommand): Promise<Shadow> {
        console.log(request);
        const shadow = Shadow.create(
            request.id,
            StringObject.create(request.data.identifier),
            ShadowType.create(request.data.type),
            ShadowState.create(request.data.state),
            Coords.create(request.data.coords.x, request.data.coords.y),
        );
        console.log(shadow)
        const result = await this.persist.update(shadow);
        if (!result){
            throw new Error("Error updating shadow");
        }
        return shadow;

    }

}