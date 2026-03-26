import {Season} from "../../Model/Season";
/**
 * Represents the data transfer object for a season response.
 */
export class SeasonResponse {
    /**
     * The unique identifier of the season.
     * @example "season-123"
     */
    id: string;
    /**
     * The start date of the season in ISO 8601 format.
     * @example "2023-09-01T00:00:00.000Z"
     */
    startDate: string;
    /**
     * The end date of the season in ISO 8601 format.
     * @example "2024-06-30T23:59:59.999Z"
     */
    endDate: string;

        /**
         * The creation date of the season in ISO 8601 format.
         * @example "2023-09-01T00:00:00.000Z"
         */
        created_at: string;
        /**
         * The last update date of the season in ISO 8601 format.
         * @example "2023-09-01T00:00:00.000Z"
         */
        updated_at: string;
        /**
         * The deletion date of the season in ISO 8601 format, or an empty string if not deleted.
         * @example "2024-07-15T10:30:00.000Z"
         */
        deleted_at: string;

    /**
     * Creates a SeasonResponse from a Season entity.
     * @param {Season} season - The season entity.
     * @returns {SeasonResponse} A new SeasonResponse instance.
     * @example
     * const season = new Season("some-id", new Date("2023-09-01"), new Date("2024-06-30"));
     * const seasonResponse = SeasonResponse.create(season);
     * // seasonResponse will be:
     * // {
     * //   id: "some-id",
     * //   startDate: "2023-09-01T00:00:00.000Z",
     * //   endDate: "2024-06-30T00:00:00.000Z"
     * // }
     */
    static create(season: Season): SeasonResponse {
        const response = new SeasonResponse();
        response.id = season.id.value;
        response.startDate = season.startDate.toISOString();
        response.endDate = season.endDate.toISOString();
        response.created_at = season.timestamps.createdAt.toISOString();
        response.updated_at = season.timestamps.updatedAt.toISOString();
        response.deleted_at = season.softDelete.value?.toISOString() || '';
        return response;
    }
    static createList(seasons: Season[]): SeasonResponse[] {
        return seasons.map(season => SeasonResponse.create(season));
    }
}