import { CreateSeasonCommand } from './CreateSeasonCommand';

export class CloneSeasonCommand {
  newSeason: CreateSeasonCommand;
  oldSeasonId: string;
  constructor(newSeason: CreateSeasonCommand, oldSeasonId: string) {
    this.newSeason = newSeason;
    this.oldSeasonId = oldSeasonId;
  }
}
