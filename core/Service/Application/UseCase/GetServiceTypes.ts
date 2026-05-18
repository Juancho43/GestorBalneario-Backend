import {IUseCase} from "../../../common/Application/IUseCase";
import {ServiceType} from "../../Model/ServiceCategory";

export class GetServiceTypes implements IUseCase<undefined,string[]> {
    execute(_request: undefined): Promise<string[]> {
        return Promise.resolve(Object.values(ServiceType));
    }
}