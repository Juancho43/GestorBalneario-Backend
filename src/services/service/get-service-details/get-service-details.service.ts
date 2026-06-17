import {Inject, Injectable, Logger} from '@nestjs/common';
import {GetByIdQuery} from "../../../../core/common/Application/GetByIdQuery";
import {SERVICE_TOKEN} from "../../SERVICE_TOKEN";
import {ServiceDetails} from "../../../../core/Service/Application/UseCase/ServiceDetails";

@Injectable()
export class GetServiceDetailsService {

    private logger = new Logger(GetServiceDetailsService.name);

    constructor(@Inject(SERVICE_TOKEN.USECASE.GET_DETAILS)private useCase : ServiceDetails){}

    execute(id: GetByIdQuery){
        try{
            this.logger.debug('Executing GetServiceDetailsService',id);
            return this.useCase.execute(id)
        } catch(error) {
            this.logger.error(error);
            throw error;
        }
    }
}
