import {Season} from "../../Model/Season";
import {Service} from "../../../Service/Model/Service";
import {Shadow} from "../../../Shadow/Model/Shadow";

/**
 * Data Transfer Object for cloning a season.
 * @class CloneSeasonDTO
 */
export class CloneSeasonDTO{
    /**
     * The season to be cloned.
     * @property {Season} season
     * @example
     * { id: 1, name: '2024-2025' }
     */
    season: Season;
    /**
     * The shadows associated with the season.
     * @property {Shadow[]} shadows
     * @example
     * [{ id: 10, name: 'Shadow A' }, { id: 11, name: 'Shadow B' }]
     */
    shadows : Shadow[];
    /**
     * The services associated with the season.
     * @property {Service[]} services
     * @example
     * [{ id: 100, name: 'Service 1' }, { id: 101, name: 'Service 2' }]
     */
    services : Service[];
}