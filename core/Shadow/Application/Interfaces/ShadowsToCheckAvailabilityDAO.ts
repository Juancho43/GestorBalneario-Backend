import {Shadow} from "core/Shadow/Model/Shadow";

export interface ShadowsToCheckAvailabilityDAO{
    get(date: Date) : Promise<Shadow[]>
}