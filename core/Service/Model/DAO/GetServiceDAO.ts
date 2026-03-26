import {Service} from "../Service";

export interface GetServiceDAO{
    get(id:string): Promise<Service|null>;
}