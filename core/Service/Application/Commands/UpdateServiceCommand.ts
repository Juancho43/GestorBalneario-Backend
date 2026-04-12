import { CreateServiceCommand } from './CreateServiceCommand';

export class UpdateServiceCommand {
  id: string;
  data: CreateServiceCommand;

  constructor(id: string, data: CreateServiceCommand) {
    this.id = id;
    this.data = data;
  }
}
