import {Injectable, Logger} from '@nestjs/common';
import {GetServiceTypes} from "../../../../core/Service/Application/UseCase/GetServiceTypes";

@Injectable()
export class GetServiceTypesService {
    private logger = new Logger(GetServiceTypesService.name);
    private useCase : GetServiceTypes;

    constructor(){
        this.useCase = new GetServiceTypes();
    }

    execute(){
        try{
            this.logger.debug('Executing GetServiceTypesService');
            return this.useCase.execute(undefined);
        } catch(error) {
            this.logger.error(error);
            throw error;
        }
    }
}
