import {Invoice} from "../../core/Invoice/Model/Invoice";
import {UUID} from "../../core/common/Model/UUID";
import {Timestamps} from "../../core/common/Model/Timestamps";
import {SoftDelete} from "../../core/common/Model/SoftDelete";
export interface InvoiceProps {
    id: UUID;
    date: Date;
    clientId: UUID;
    timestamps: Timestamps;
    softDelete: SoftDelete;
}
export class InvoiceMother {

    private static defaultProps(): InvoiceProps {
        return {
            id: UUID.create(),
            date: new Date('2026-04-06T12:00:00Z'),
            clientId: UUID.create(),
            timestamps: Timestamps.create(),
            softDelete: SoftDelete.empty(),
        };
    }

    /**
     * PASO 2: El Motor de Flexibilidad.
     * Recibe un 'Partial' para que el programador solo envíe lo que le importa evaluar.
     */
    static create(overrides?: Partial<InvoiceProps>): Invoice {
        // Fusionamos los valores por defecto con las sobreescrituras usando el spread operator (...)
        const props: InvoiceProps = {
            ...this.defaultProps(),
            ...overrides
        };

        // Instanciamos usando tu factory method real
        return Invoice.create(
            props.id,
            props.date,
            props.clientId,
            props.timestamps,
            props.softDelete
        );
    }
}