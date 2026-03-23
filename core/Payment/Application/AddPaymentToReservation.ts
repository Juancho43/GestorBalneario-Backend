import {IUseCase} from "../../common/Application/IUseCase";
import {CreatePaymentCommand} from "./DTO/CreatePaymentCommand";
import {Payment} from "../Model/Payment";
import {CreatePaymentDAO} from "../Model/DAO/CreatePaymentDAO";
import {GetReservationDAO} from "../../Reservation/Model/DAO/GetReservationDAO";
import {StringObject} from "../../common/Model/StringObject";
import {PaymentType} from "../Model/PaymentType";
import {UUID} from "../../common/Model/UUID";
import {Money} from "../Model/Money";
import {Timestamps} from "../../common/Model/Timestamps";
import {SoftDelete} from "../../common/Model/SoftDelete";

export class AddPaymentToReservation implements IUseCase<CreatePaymentCommand, Payment>{
    constructor(
        private dao: CreatePaymentDAO,
        private getReservation: GetReservationDAO
    ) {
    }

    async execute(command: CreatePaymentCommand): Promise<Payment> {
        const reservation = await this.getReservation.get(command.reservationId);
        if (!reservation) {
            throw new Error("Reservation not found!");
        }
        const money = Money.create(
            command.amount,
            command.changeType,
            command.type
        );

        const payment = Payment.create(
            UUID.create(),
            new Date(command.date),
            PaymentType.create(command.type),
            money,
            reservation.id,
            StringObject.create(command.description?? command.date.toISOString()),
            Timestamps.create(command.date),
            SoftDelete.empty()
        );

        await this.dao.save(payment);
        return payment;
    }
}