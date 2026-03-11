import {DeleteShadowById} from "../Model/DeleteShadowById";
import {IUseCase} from "../../common/Application/IUseCase";
import {DeleteShadowCommand} from "./DTO/DeleteShadowCommand";

export class DeleteShadow implements IUseCase<DeleteShadowCommand, void>{

    constructor( private DeleteShadowById: DeleteShadowById) {
    }

    async execute(request: DeleteShadowCommand): Promise<void> {

        const result = await this.DeleteShadowById.delete(request.shadowId);
        if (!result){
            throw new Error("Shadow not found");
        }
    }
}