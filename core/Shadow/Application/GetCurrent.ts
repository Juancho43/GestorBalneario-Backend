import {IUseCase} from "../../common/Application/IUseCase";
import {GetShadowListByHoliday} from "./DTO/GetShadowListByHoliday";
import {Shadow} from "../Model/Shadow";
import {GetShadowListDAO} from "../Model/DAO/GetShadowListDAO";
import {ShadowResponse} from "./DTO/ShadowResponse";

export class GetCurrent implements IUseCase<GetShadowListByHoliday, Shadow[]>{
    constructor(private getCurrentShadows: GetShadowListDAO) {

    }

    async execute(): Promise<Shadow[]> {
        let shadows = await this.getCurrentShadows.getCurrentShadows();

        return shadows;
    }


}