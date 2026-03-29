import {Inject, Injectable, Logger} from '@nestjs/common';
import {ProcessPayment} from "../../../../core/Payment/Application/ProcessPayment";
import {CreatePaymentCommand} from "../../../../core/Payment/Application/Command/CreatePaymentCommand";
import {PaymentResponse} from "../../../../core/Payment/Application/DTO/PaymentResponse";
import type {CreatePaymentDAO} from "../../../../core/Payment/Model/DAO/CreatePaymentDAO";
import type {GetInvoiceDAO} from "../../../../core/Invoice/Model/DAO/GetInvoiceDAO";

@Injectable()
export class CreatePaymentService {

    private useCase: ProcessPayment;
    private logger = new Logger(CreatePaymentService.name);
    constructor(
        @Inject('CREATE_PAYMENT_DAO') createPayment: CreatePaymentDAO,
        @Inject('GET_INVOICE_DAO') getInvoice:GetInvoiceDAO
    ) {
        this.useCase = new ProcessPayment(createPayment,getInvoice);
    }

    async execute(command: CreatePaymentCommand) {
        try {
            this.logger.debug('Creating payment')
            return PaymentResponse.create(await this.useCase.execute(command));
        }catch (error) {
            this.logger.error(error.message);
            throw error;
        }
    }
}
