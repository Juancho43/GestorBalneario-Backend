export class AddInvoiceItemCommand {
    aggregateId:string;
    clientId: string;
    serviceId: string;
    price:number;
    date:Date;
    description:string;
}