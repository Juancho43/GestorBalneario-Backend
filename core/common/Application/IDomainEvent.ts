import {UUID} from "../Model/UUID";

export interface IDomainEvent {
    /** Fecha y hora exacta en que ocurrió el evento */
    readonly occurredOn: Date;

    /** Identificador único del evento (para trazabilidad/logs) */
    readonly eventId: UUID;

    /** El ID de la entidad principal (ej: el ID de la reserva) */
    readonly aggregateId: string;

    /** Nombre único del evento (ej: 'reservation.created') */
    readonly eventName: string;
}