import {ServiceResponse} from "../Application/DTO/ServiceResponse";
import {ServiceSearchQuery} from "../Application/Queries/ServiceSearchQuery";

export interface ServiceSearcherDAO {
    search(query: ServiceSearchQuery): Promise<ServiceResponse[]>;
}