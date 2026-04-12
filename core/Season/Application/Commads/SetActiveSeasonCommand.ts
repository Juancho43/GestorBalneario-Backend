export class SetActiveSeasonCommand {
  seasonId: string;

  constructor(seasonId: string) {
    this.seasonId = seasonId;
  }
}
