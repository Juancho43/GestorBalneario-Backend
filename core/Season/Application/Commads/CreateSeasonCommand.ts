/**
 * A command to create a new season.
 */
export class CreateSeasonCommand {
  /**
   * The start date of the season in YYYY-MM-DD format.
   * @example "2024-01-01"
   */
  startDate: string;
  /**
   * The end date of the season in YYYY-MM-DD format.
   * @example "2024-12-31"
   */
  endDate: string;
  /*
   * A brief name for the season
   * @example: "2024 Summer season"
   * */
  name: string;

  isActive: boolean;

  constructor(
    startDate: string,
    endDate: string,
    name: string,
    isActive: boolean,
  ) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.name = name;
    this.isActive = isActive;
  }
}
