export class CreateServiceCommand{
       /**
        * The name of the service.
        * @example "Towel service"
        */
       name:string;
       /**
        * The price of the service.
        * @example 10
        */
       price:number;
       constructor(name: string, price: number) {
              this.name = name;
              this.price = price;
       }
}