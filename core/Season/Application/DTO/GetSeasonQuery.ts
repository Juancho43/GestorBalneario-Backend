/**
 * Represents the query to get a season by its ID.
 * @example
 * const query = new GetSeasonQuery('some-season-id');
 */
export class GetSeasonQuery{
    /**
     * The unique identifier for the season.
     * @example 'season-123'
     */
    seasonId:string;


    /**
     * @param {string} seasonId The unique identifier for the season.
     */
    constructor(seasonId: string) {
        this.seasonId = seasonId;
    }
}