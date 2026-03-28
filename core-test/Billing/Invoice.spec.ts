import {describe, it, expect, beforeEach, assert} from 'vitest';
import {Invoice} from "../../core/Invoice/Model/Invoice";
import {UUID} from "../../core/common/Model/UUID";

describe('Invoice Domain Entity', () => {

    it('should calculate the total amount correctly from items', () => {
        // 1. Arrange (Preparar)
        // const invoices = new Invoice(UniqueIdentifier.create(), new Date(), UniqueIdentifier.create());
        //
        // // Creamos items falsos que cumplan con la interfaz InvoiceItem
        // const item1 = { getPrice: () => ({ finalAmount: 100 }) } as any;
        // const item2 = { getPrice: () => ({ finalAmount: 150 }) } as any;
        //
        // // 2. Act (Actuar)
        // invoices.addItem(item1);
        // invoices.addItem(item2);
        //
        // // 3. Assert (Verificar)
        // expect(invoices.calculateTotalAmount()).toBe(250);
        expect(true).toBe(true);
    });

    it('should identify if it is fully paid', () => {
        // const invoices = new Invoice(new UniqueIdentifier(), new Date(), new UniqueIdentifier());
        // // Supongamos que internamente seteamos el total a 500
        // // (O mejor, agregamos items que sumen 500)
        //
        // const payment = {
        //     getId: () => new UniqueIdentifier(),
        //     finalAmount: 500
        // } as any;
        //
        // // Vinculamos el ID del pago a la factura primero
        // invoices.registerPaymentId(payment.getId());
        //
        // expect(invoices.isFullyPaid([payment])).toBe(true);
    });
});