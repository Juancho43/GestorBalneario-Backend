import {Inject, Injectable} from '@nestjs/common';
import {AddPaymentToReservation} from "../../../../core/Payment/Application/AddPaymentToReservation";
import {CreatePaymentCommand} from "../../../../core/Payment/Application/DTO/CreatePaymentCommand";
import {PaymentResponse} from "../../../../core/Payment/Application/DTO/PaymentResponse";
import type {CreatePaymentDAO} from "../../../../core/Payment/Model/DAO/CreatePaymentDAO";
import type {GetReservationDAO} from "../../../../core/Reservation/Model/DAO/GetReservationDAO";

@Injectable()
export class CreatePaymentService {

    private useCase: AddPaymentToReservation;

    constructor(
        @Inject('CREATE_PAYMENT_DAO') createPayment: CreatePaymentDAO,
        @Inject('GET_RESERVATION_DAO') getReservation: GetReservationDAO
    ) {
        this.useCase = new AddPaymentToReservation(createPayment,getReservation);
    }

    async execute(command: CreatePaymentCommand) {
        try {
            return PaymentResponse.create(await this.useCase.execute(command));
        }catch (error) {
            throw error;
        }
    }
}
