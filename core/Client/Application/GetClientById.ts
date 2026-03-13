import {IUseCase} from "../../common/Application/IUseCase";
import {GetClientQuery} from "./DTO/GetClientQuery";
import {Client} from "../Model/Client";
import {GetClientDAO} from "../Model/DAO/GetClientDAO";
import {NotFoundException} from "@nestjs/common";

export class GetClientById implements IUseCase<GetClientQuery, Client>{
    constructor(private dao: GetClientDAO) {
    }
    async execute(request: GetClientQuery): Promise<Client> {
        const client =  await this.dao.get(request.id);
        if(!client){
            throw new NotFoundException("Client not found!");
        }
        return client;
    }
}