import {IUseCase} from "../../common/Application/IUseCase";
import {UpdateClientCommand} from "./DTO/UpdateClientCommand";
import {Client} from "../Model/Client";
import {UpdateClientDAO} from "../Model/DAO/UpdateClientDAO";
import {StringObject} from "../../common/Model/StringObject";
import {EmailObject} from "../../common/Model/EmailObject";

export class UpdateClient implements IUseCase<UpdateClientCommand, Client>{
    constructor(private dao: UpdateClientDAO) {
    }

    async execute(request: UpdateClientCommand): Promise<Client> {
        const client = Client.create(
            request.id,
            StringObject.create(request.data.name),
            EmailObject.create(request.data.email),
            StringObject.create(request.data.phone)
        )
        await this.dao.update(client);
        return client;
    }
}