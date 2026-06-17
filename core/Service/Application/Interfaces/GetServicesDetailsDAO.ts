import {GetByIdQuery} from "../../../common/Application/GetByIdQuery";
import {ServiceDetailsResponse} from "../DTO/ServiceDetailsResponse";

export interface GetServiceDetailsDAO {
    get(id: GetByIdQuery) : Promise<ServiceDetailsResponse>;
}