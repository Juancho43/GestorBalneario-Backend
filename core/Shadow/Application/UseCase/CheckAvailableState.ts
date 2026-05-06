import {IUseCase} from "../../../common/Application/IUseCase";
import {ShadowsToCheckAvailabilityDAO} from "../Interfaces/ShadowsToCheckAvailabilityDAO";
import {Shadow} from "../../Model/Shadow";
import {UpdateShadowStateRepository} from "../Interfaces/UpdateShadowStateRepository";

export class CheckAvailableState implements IUseCase<undefined,undefined>{

    constructor(
        private readonly dao: ShadowsToCheckAvailabilityDAO,
        private readonly command: UpdateShadowStateRepository
    ) {
    }

    async execute(): Promise<undefined> {
        const date = new Date()
        const shadows = await this.dao.get(date);
        let availableShadows : Shadow[] = [];
        shadows.forEach(shadow => {
            if (shadow.isAvailable(date)){
                shadow.makeAvailable();
                availableShadows.push(shadow);
            }
        })
        await this.command.update(availableShadows);
    }
}