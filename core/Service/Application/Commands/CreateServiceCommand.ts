export class CreateServiceCommand {
  /**
   * The name of the service.
   * @example "Towel service"
   */
  name: string;
  /**
   * The price of the service.
   * @example 10
   */
  price: number;
  type:string;
  constructor(name: string, price: number,type:string) {
    this.name = name;
    this.price = price;
    this.type = type;
  }
}
