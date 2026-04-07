import {Season} from "../../Model/Season";
import {TimeStampResponse} from "../../../common/Application/TimeStampResponse";
/**
 * Represents the data transfer object for a season response.
 * @example
 * {
 *   "id": "season-123",
 *   "startDate": "2023-09-01T00:00:00.000Z",
 *   "endDate": "2024-06-30T23:59:59.999Z",
 *   "name": "2023-2024 Season",
 *   "isActive": true,
 *   "createdAt": "2023-01-01T10:00:00.000Z",
 *   "updatedAt": "2023-01-01T10:00:00.000Z",
 *   "deletedAt": ""
 * }
 */
export class SeasonResponse extends TimeStampResponse{
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
     * The name of the season.
     * @example "2023-2024 Season"
     */
    name: string;
    /**
    * If the season is currently active.
    * @example true
    */
    isActive: boolean;


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
     * //   endDate: "2024-06-30T00:00:00.000Z",
     * //   name: "2023-2024 Season",
     * //   isActive: true,
     * //   ...
     * // }
     */
    static create(season: Season): SeasonResponse {
        const response = new SeasonResponse();
        response.id = season.id.value;
        response.startDate = season.startDate.toISOString();
        response.endDate = season.endDate.toISOString();
        response.isActive = season.isActive;
        response.name = season.name.getValue();
        response.create_at = season.timestamps.createdAt.toISOString();
        response.updated_at = season.timestamps.updatedAt.toISOString();
        response.deleted_at = season.softDelete.value?.toISOString() || '';
        return response;
    }

    /**
     * Creates a list of SeasonResponse objects from a list of Season entities.
     * @param {Season[]} seasons - The list of season entities.
     * @returns {SeasonResponse[]} A list of SeasonResponse instances.
     */
    static createList(seasons: Season[]): SeasonResponse[] {
        return seasons.map(season => SeasonResponse.create(season));
    }
}