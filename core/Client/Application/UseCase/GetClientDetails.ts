import {GetClientQuery} from "../Queries/GetClientQuery";
import {ClientDetailsDTO} from "../DTO/ClientDetailsDTO";
import {ClientDetailsDAO} from "../Interfaces/ClientDetailsDAO";
import {IUseCase} from "../../../common/Application/IUseCase";

export class GetClientDetails implements IUseCase<GetClientQuery,ClientDetailsDTO> {
    constructor(private persistence: ClientDetailsDAO) {}

    execute(request: GetClientQuery): Promise<ClientDetailsDTO> {
        return this.persistence.get(request);
    }
}