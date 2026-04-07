import {Money} from "../../core/Payment/Model/Money";
import {UUID} from "../../core/common/Model/UUID";
import {StringObject} from "../../core/common/Model/StringObject";
import {Reservation_Service} from "../../core/Service/Model/Reservation_Service";
import {MoneyMother} from "../mothers/MoneyMother";

export class ReservationServiceMother {
    static create(overrides: Partial<{
        id: UUID;
        price: Money;
        description: StringObject;
        serviceId: UUID;
        reservationId: UUID;
        invoiceId: UUID;
    }> = {}): Reservation_Service {

        const defaults = {
            id: overrides.id ?? UUID.create(),
            price: overrides.price ?? MoneyMother.create({ amount: 2500 }),
            description: overrides.description ?? StringObject.create('Servicio de Sombra - Carpa Estándar'),
            serviceId: overrides.serviceId ?? UUID.create(),
            reservationId: overrides.reservationId ?? UUID.create(),
            invoiceId: overrides.invoiceId ?? UUID.create(),
        };

        return Reservation_Service.create(
            defaults.id,
            defaults.price,
            defaults.description,
            defaults.serviceId,
            defaults.reservationId,
            defaults.invoiceId
        );
    }

    /**
     * Helper para crear un item vinculado a una factura específica
     */
    static forInvoice(invoiceId: UUID): Reservation_Service {
        return this.create({ invoiceId });
    }
}