import {Injectable, Logger} from '@nestjs/common';
import {GetPaymentTypes} from "../../../../core/Payment/Application/UseCase/GetPaymentTypes";

@Injectable()
export class GetPaymentTypesService {
    private logger = new Logger(GetPaymentTypesService.name);
    private useCase : GetPaymentTypes;

    constructor(){
        this.useCase = new GetPaymentTypes();
    }

    execute(){
        try{
            this.logger.debug('Executing GetPaymentTypesService');
            return this.useCase.execute(undefined);
        } catch(error) {
            this.logger.error(error);
            throw error;
        }
    }
}
