import { vi, describe, it, expect } from 'vitest'
import {GeneratePaymentReport} from "../../../core/Payment/Application/GeneratePaymentReport";
import {PaymentsReportDAO} from "../../../core/Payment/Application/PaymentsReportDAO";
import {PaymentsReportQuery} from "../../../core/Payment/Application/Query/PaymentsReportQuery";
import {PaymentsReportDTO} from "../../../core/Payment/Application/DTO/PaymentsReportDTO";

describe('GeneratePaymentReport', () => {
    let useCase: GeneratePaymentReport;
    let mockDao: PaymentsReportDAO;

    beforeEach(() => {
        // 1. Organizamos el aliado (Mock)
        // Creamos un objeto que simula la interfaz del DAO
        mockDao = {
            get: vi.fn(),
        };

        // 2. Instanciamos el Use Case con la dependencia inyectada
        useCase = new GeneratePaymentReport(mockDao);
    });
    it('Should return a response', async () => {
        const mockQuery: PaymentsReportQuery = {
            start:'2026-01-01',
            end: '2026-01-31',
            method: 'ALL',
            page:0,
            limit:10
        };

        const mockResponse: PaymentsReportDTO = {
            payments: [
                {
                    id:'res123',
                    date:'2026-01-15',
                    type:'CASH',
                    amount:100,
                    changeType:1,
                    description:'Test payment',
                    finalAmount:100
                }
            ]
        };

        // Programamos el comportamiento del mock (Brian Tracy: Claridad de metas)
        vi.mocked(mockDao.get).mockResolvedValue(mockResponse);

        // ACT (Actuar)
        const result = await useCase.execute(mockQuery);

        // ASSERT (Afirmar)
        // Verificamos que el resultado sea el esperado
        expect(result).toEqual(mockResponse);

        // Verificamos que el DAO fue llamado exactamente con la Query recibida
        expect(mockDao.get).toHaveBeenCalledWith(mockQuery);
        expect(mockDao.get).toHaveBeenCalledTimes(1);
    })

})