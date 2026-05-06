import {CreateSeasonCommand} from './CreateSeasonCommand';

export class UpdateSeasonCommand {
  id: string;
  data: CreateSeasonCommand;

  constructor(id: string, data: CreateSeasonCommand) {
    this.id = id;
    this.data = data;
  }
}
