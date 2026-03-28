import {IUseCase} from "../../common/Application/IUseCase";
import {GetShadowListByHoliday} from "./DTO/GetShadowListByHoliday";
import {Shadow} from "../Model/Shadow";
import {GetShadowListDAO} from "../Model/DAO/GetShadowListDAO";

export class GetCurrent implements IUseCase<GetShadowListByHoliday, Shadow[]>{
    constructor(private getCurrentShadows: GetShadowListDAO) {

    }

    async execute(): Promise<Shadow[]> {
         return await this.getCurrentShadows.getCurrentShadows();
    }
}