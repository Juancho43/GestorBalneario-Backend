export class EmailObject {
    private email: string;

    private constructor(email: string) {
        this.email = email;
    }

    static create(email: string): EmailObject | Error {
        if (!EmailObject.validateEmail(email)) {
            return new Error("El formato del correo electrónico no es válido.");
        }
        return new EmailObject(email);
    }

    private static validateEmail(email: string): boolean {
        // Expresión regular estándar para validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Método para obtener el valor de forma segura
    public getValue(): string {
        return this.email;
    }
}