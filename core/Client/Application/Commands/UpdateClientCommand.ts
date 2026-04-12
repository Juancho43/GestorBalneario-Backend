import { CreateClientCommand } from './CreateClientCommand';
export class UpdateClientCommand {
  /**
   * Id of the client to edit
   * @example "client-123"
   * */
  id: string;
  /**
   * Data of the client
   * */
  data: CreateClientCommand;

  constructor(id: string, data: CreateClientCommand) {
    this.id = id;
    this.data = data;
  }
}
