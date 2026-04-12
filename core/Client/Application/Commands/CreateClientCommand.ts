export class CreateClientCommand {
  /**
   * Client's full name
   * @example "Juan Bravo"
   * */
  name: string;
  /**
   * Client's email
   * @example "example@mail.com"
   * */
  email: string;
  /**
   * Client's phone number
   * @example "+1-555-123-4567"
   * */
  phone: string;

  constructor(name: string, email: string, phone: string) {
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
}
