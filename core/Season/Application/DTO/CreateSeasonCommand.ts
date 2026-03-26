/**
 * A command to create a new season.
 */
export class CreateSeasonCommand{
    /**
     * The start date of the season in YYYY-MM-DD format.
     * @example "2024-01-01"
     */
    startDate:string;
    /**
     * The end date of the season in YYYY-MM-DD format.
     * @example "2024-12-31"
     */
    endDate:string;

}