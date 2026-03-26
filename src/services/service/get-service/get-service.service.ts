import {Inject, Injectable, Logger} from '@nestjs/common';
import {ServiceResponse} from "../../../../core/Service/Application/DTO/ServiceResponse";
import type {GetServiceDAO} from "../../../../core/Service/Model/DAO/GetServiceDAO";
import {GetService} from "../../../../core/Service/Application/GetService";
import {GetServiceQuery} from "../../../../core/Service/Application/DTO/GetServiceQuery";

@Injectable()
export class GetServiceService {

    private logger = new Logger(GetServiceService.name);
    private useCase : GetService;
    constructor(@Inject('GET_SERVICE') private dao: GetServiceDAO) {
        this.useCase = new GetService(dao);
    }

    async execute(query: GetServiceQuery){
        try {
            this.logger.debug('Getting a service', query.id)
            return ServiceResponse.create(await this.useCase.execute(query));
        }catch (e) {
            this.logger.error(e.message);
            return e;
        }
    }
}
