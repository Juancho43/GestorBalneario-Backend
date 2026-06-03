import {ReportStrategy} from "./ReportStrategy";
import {PaymentsReportDTO} from "../../DTO/PaymentsReportDTO";

export class HtmlReportStrategy implements ReportStrategy {
    format(report: PaymentsReportDTO): string {

        // This gives you the "Efectivo: $X, USD_DOLLAR: $Y" summary from your first image
        const summary = report.payments.reduce((acc, p) => {
            acc[p.type] = (acc[p.type] || 0) + p.finalAmount;
            return acc;
        }, {} as Record<string, number>);

        const summaryRows = Object.entries(summary)
            .map(([type, total]) => `
                <tr>
                    <td><strong>${this.translateType(type)}</strong></td>
                    <td class="text-right">$${total.toFixed(2)}</td>
                </tr>
            `).join('');

        // 2. Generate the Detailed Rows
        const detailRows = report.payments.map(p => {
            const dateStr = new Date(p.date).toLocaleDateString('es-AR', {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
            });


            return `
                <tr>
                    <td>${dateStr}</td>
                    <td>${this.translateType(p.type)}</td>
                    <td class="text-right">$${p.amount.toFixed(2)}</td>
                    <td class="text-right">${p.changeType}</td>
                    <td class="text-right fw-bold">$${p.finalAmount.toFixed(2)}</td>
                    <td class="text-center"><small>${p.invoiceId!}</small></td>
                </tr>
            `;
        }).join('');

        // 3. Construct and Return the HTML Template
        return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reporte de Pagos</title>
            <style>
                /* Base Reset & Typography */
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 40px; color: #2c3e50; }
                h1, h2, p { margin: 0; }
                
                /* Layout & Header */
                .header { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 3px solid #34495e; padding-bottom: 15px; margin-bottom: 30px; }
                .header-titles h1 { font-size: 28px; color: #2c3e50; text-transform: uppercase; letter-spacing: 1px; }
                .header-titles p { font-size: 14px; color: #7f8c8d; margin-top: 5px; }
                .header-meta { text-align: right; color: #7f8c8d; font-size: 14px; }
                
                /* Tables */
                .section-title { font-size: 18px; color: #34495e; margin-bottom: 12px; border-bottom: 1px solid #ecf0f1; padding-bottom: 5px; text-transform: uppercase; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 40px; font-size: 13px; }
                th, td { border: 1px solid #bdc3c7; padding: 10px 12px; text-align: left; }
                th { background-color: #ecf0f1; color: #2c3e50; font-weight: bold; text-transform: uppercase; font-size: 12px; }
                
                /* Utilities */
                .text-right { text-align: right; }
                .text-center { text-align: center; }
                .fw-bold { font-weight: bold; }
                .summary-table { width: 50%; min-width: 300px; }
                
                /* Footer Total */
                .total-section { text-align: right; font-size: 22px; font-weight: bold; color: #2c3e50; padding-top: 15px; border-top: 3px solid #34495e; background-color: #f8f9fa; padding: 15px; }
                
                /* Print Optimization */
                @media print {
                    body { padding: 0; margin: 1cm; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    .header { border-bottom: 2px solid #000; }
                    th { background-color: #e9ecef !important; }
                    .total-section { border-top: 2px solid #000; background-color: transparent !important; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="header-titles">
                    <h1>Reporte de Pagos</h1>
                    <p>Sistema de Gestión - Balneario</p>
                </div>
                <div class="header-meta">
                    <p><strong>Fecha de Emisión:</strong> ${new Date().toLocaleDateString('es-AR')}</p>
                    <p><strong>Transacciones:</strong> ${report.payments.length}</p>
                </div>
            </div>

            <h2 class="section-title">Resumen de Caja</h2>
            <table class="summary-table">
                <thead>
                    <tr>
                        <th>Método de Pago</th>
                        <th class="text-right">Total Recaudado</th>
                    </tr>
                </thead>
                <tbody>
                    ${summaryRows}
                </tbody>
            </table>

            <h2 class="section-title">Detalle de Transacciones</h2>
            <table>
                <thead>
                    <tr>
                        <th>Fecha y Hora</th>
                        <th>Tipo</th>
                        <th class="text-right">Monto Base</th>
                        <th class="text-right">Recargo / Cambio</th>
                        <th class="text-right">Total Final</th>
                        <th class="text-center">Ref. Factura</th>
                    </tr>
                </thead>
                <tbody>
                    ${detailRows}
                </tbody>
            </table>

            <div class="total-section">
                TOTAL DEL REPORTE: $${report.total.toFixed(2)}
            </div>

            <script>
                // Automatically open the print dialog as soon as the page loads
                window.onload = function() {
                    window.print();
                };
            </script>
        </body>
        </html>
        `;
    }

    getContentType(): string {
        return 'text/html';
    }

    // A small helper method to make your database enums look professional on paper
    private translateType(type: string): string {
        const dictionary: Record<string, string> = {
            'CASH': 'Efectivo',
            'USD_DOLLAR': 'Dólar (USD)',
            'CREDIT_CARD': 'Tarjeta de Crédito',
            'DEBIT_CARD': 'Tarjeta de Débito',
            'BANK_TRANSFER': 'Transferencia'
        };
        return dictionary[type] || type;
    }
}