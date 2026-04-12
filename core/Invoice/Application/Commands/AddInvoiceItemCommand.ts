export class AddInvoiceItemCommand {
  aggregateId: string;
  clientId: string;
  serviceId: string;
  price: number;
  date: Date;
  description: string;
  type: string;

  constructor(
    aggregateId: string,
    clientId: string,
    serviceId: string,
    price: number,
    date: Date,
    description: string,
    type: string,
  ) {
    this.aggregateId = aggregateId;
    this.clientId = clientId;
    this.serviceId = serviceId;
    this.price = price;
    this.date = date;
    this.description = description;
    this.type = type;
  }
}
