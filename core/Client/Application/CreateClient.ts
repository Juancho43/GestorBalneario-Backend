import {IUseCase} from "../../common/Application/IUseCase";
import {CreateClientCommand} from "./DTO/CreateClientCommand";
import {Client} from "../Model/Client";
import {SaveClientDAO} from "../Model/DAO/SaveClientDAO";
import {randomUUID} from "node:crypto";
import {StringObject} from "../../common/Model/StringObject";
import {EmailObject} from "../../common/Model/EmailObject";
import {Timestamps} from "../../common/Model/Timestamps";
import {SoftDelete} from "../../common/Model/SoftDelete";
import {UniqueIdentifier} from "../../common/Model/UniqueIdentifier";

export class CreateClient implements IUseCase<CreateClientCommand, Client>{
    constructor(private saveClientDAO: SaveClientDAO) {}
    async execute(request: CreateClientCommand): Promise<Client> {
        const client = Client.create(
            UniqueIdentifier.create(),
            StringObject.create(request.name),
            EmailObject.create(request.email),
            StringObject.create(request.phone),
            Timestamps.create(),
            SoftDelete.empty()
        )
        await this.saveClientDAO.save(client);
        return client;
    }
}
