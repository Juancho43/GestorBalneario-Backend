export class InvalidReservationActionError extends Error {
    public readonly stateName: string;
    public readonly actionName: string;

    constructor(stateName: string, actionName: string) {
        super(`Acción denegada: No se puede ejecutar '${actionName}' porque la reserva se encuentra en estado '${stateName}'.`);

        this.name = 'InvalidReservationActionError';
        this.stateName = stateName;
        this.actionName = actionName;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InvalidReservationActionError);
        }
    }
}