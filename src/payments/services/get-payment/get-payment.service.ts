import {Inject, Injectable, Logger} from '@nestjs/common';
import {GetPayment} from "../../../../core/Payment/Application/UseCase/CRUD/GetPayment";
import {PAYMENT_TOKEN} from "../../PAYMENT_TOKEN";
import {GetByIdQuery} from "../../../../core/common/Application/GetByIdQuery";

@Injectable()
export class GetPaymentService {
    private logger = new Logger(GetPaymentService.name);

    constructor(
        @Inject(PAYMENT_TOKEN.USECASE.GET_PAYMENT)
        private useCase : GetPayment

    ){}

    execute(command: GetByIdQuery){
        try{
            this.logger.debug('Executing GetPaymentService',command);
            return this.useCase.execute(command)
        } catch(error) {
            this.logger.error(error);
            throw error;
        }
    }
}
