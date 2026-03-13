import {IUseCase} from "../../common/Application/IUseCase";
import {CreateClientCommand} from "./DTO/CreateClientCommand";
import {Client} from "../Model/Client";
import {SaveClientDAO} from "../Model/DAO/SaveClientDAO";
import {randomUUID} from "node:crypto";
import {StringObject} from "../../common/Model/StringObject";
import {EmailObject} from "../../common/Model/EmailObject";

export class CreateClient implements IUseCase<CreateClientCommand, Client>{
    constructor(private saveClientDAO: SaveClientDAO) {}
    async execute(request: CreateClientCommand): Promise<Client> {
        const client = Client.create(
            randomUUID().toString(),
            StringObject.create(request.name),
            EmailObject.create(request.email),
            StringObject.create(request.phone)
        )
        await this.saveClientDAO.save(client);
        return client;
    }
}
