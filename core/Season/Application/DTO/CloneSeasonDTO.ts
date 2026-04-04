import {Season} from "../../Model/Season";
import {Service} from "../../../Service/Model/Service";
import {Shadow} from "../../../Shadow/Model/Shadow";

export class CloneSeasonDTO{
    season: Season;
    shadows : Shadow[];
    services : Service[];
}