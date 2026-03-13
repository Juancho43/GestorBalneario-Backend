import {IUseCase} from "../../common/Application/IUseCase";
import {DeleteClientCommand} from "./DTO/DeleteClientCommand";
import {DeleteClientDAO} from "../Model/DAO/DeleteClientDAO";

export class DeleteClient implements IUseCase<DeleteClientCommand, void> {
    constructor(private dao: DeleteClientDAO) {
    }
    async execute(request: DeleteClientCommand): Promise<void> {
        const result = await this.dao.delete(request.id);
        if(!result){
            throw new Error("Client not found");
        }
    }

}