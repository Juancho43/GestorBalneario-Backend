import {IUseCase} from "../../common/Application/IUseCase";
import {Season} from "../Model/Season";
import {GetSeasonsDAO} from "../Model/DAO/GetSeasonsDAO";

export class GetSeasons implements IUseCase<void,Season[]> {
    constructor(private dao: GetSeasonsDAO) {
    }
    async execute(request: void): Promise<Season[]> {
        return await this.dao.get();
    }
}