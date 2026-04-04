import {Season} from "../../Model/Season";
import {Shadow} from "../../../Shadow/Model/Shadow";
import {Service} from "../../../Service/Model/Service";

export class SeasonShadowsServicesDTO{
    season : Season;
    shadows: Shadow[]=[];
    services: Service[]=[];

}