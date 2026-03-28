import {Service} from "../Service";

export interface GetServicesDAO{
    get() : Promise<Service[]>
}