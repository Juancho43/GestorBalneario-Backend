export abstract class BaseError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    protected constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
        // 1. Llamar al constructor de la clase padre (Error)
        super(message);

        // 2. Asignar el nombre exacto de la clase hija
        this.name = this.constructor.name;

        // 3. Propiedades de negocio personalizadas
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        // 4. MANTENIMIENTO VITAL EN TYPESCRIPT: Restaurar el prototipo
        // Esto asegura que 'instanceof' funcione correctamente al compilar.
        Object.setPrototypeOf(this, new.target.prototype);

        // 5. Preservar la pila de llamadas (Stack trace) para depurar (Node.js/V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}