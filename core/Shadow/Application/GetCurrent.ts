import {IUseCase} from "../../common/Application/IUseCase";
import {GetShadowListByHoliday} from "./DTO/GetShadowListByHoliday";
import {Shadow} from "../Model/Shadow";
import {GetCurrentShadows} from "../Model/GetCurrentShadows";

export class GetCurrent implements IUseCase<GetShadowListByHoliday, Shadow[]>{
    constructor(private getCurrentShadows: GetCurrentShadows) {

    }

    async execute(): Promise<Shadow[]> {
        let shadows = await this.getCurrentShadows.getCurrentShadows();

        return shadows;
    }


}