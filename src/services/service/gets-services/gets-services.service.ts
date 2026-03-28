import {Inject, Injectable, Logger} from '@nestjs/common';
import type {GetServicesDAO} from "../../../../core/Service/Model/DAO/GetServicesDAO";
import {GetServices} from "../../../../core/Service/Application/GetServices";
import {ServiceResponse} from "../../../../core/Service/Application/DTO/ServiceResponse";

@Injectable()
export class GetsServicesService {

    private logger = new Logger(GetsServicesService.name);
    private useCase : GetServices;
    constructor(@Inject('GET_SERVICES') private dao: GetServicesDAO) {
        this.useCase = new GetServices(dao);
    }

    async execute(){
        try {
            this.logger.debug('Getting services')
            return ServiceResponse.createList(await this.useCase.execute());
        }catch (e) {
           this.logger.error(e.message);
           return e;
        }
    }

}
