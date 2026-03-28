import {DeleteShadowDAO} from "../Model/DAO/DeleteShadowDAO";
import {IUseCase} from "../../common/Application/IUseCase";
import {DeleteShadowCommand} from "./Command/DeleteShadowCommand";

export class DeleteShadow implements IUseCase<DeleteShadowCommand, void>{

    constructor( private DeleteShadowById: DeleteShadowDAO) {
    }

    async execute(request: DeleteShadowCommand): Promise<void> {

        const result = await this.DeleteShadowById.delete(request.shadowId);
        if (!result){
            throw new Error("Shadow not found");
        }
    }
}