import {IUseCase} from "../../common/Application/IUseCase";
import {GetClientsQuery} from "./DTO/GetClientsQuery";
import {Client} from "../Model/Client";
import {GetClientsDAO} from "../Model/DAO/GetClientsDAO";
import {NotFoundException} from "@nestjs/common";

export class GetClients implements IUseCase<GetClientsQuery, Client[]>{
    constructor(private dao: GetClientsDAO) {
    }
    async execute(request: GetClientsQuery): Promise<Client[]> {
        const results = await this.dao.get(request);
        if (results == undefined) {
            throw new NotFoundException("Not Found");
        }
        return results;
    }

}