export class UpdateInvoiceItemCommand{
    public id: string;
    public invoiceId: string;
    public serviceId : string;
    public price : number;
    public type: string;
    public quantity : number;
    public aggregate : string;

    constructor(id:string, invoiceId: string, serviceId: string, price: number, type: string, quantity: number, aggregate: string ) {
        this.id = id;
        this.invoiceId = invoiceId;
        this.serviceId = serviceId;
        this.price = price;
        this.type = type;
        this.quantity = quantity;
        this.aggregate = aggregate;
    }
}