import {Service} from "../Service";

export interface CreateServiceDAO{
    create(service: Service): Promise<void>;
}