import {IUseCase} from "../../../common/Application/IUseCase";
import {SetActiveSeasonCommand} from "../Commads/SetActiveSeasonCommand";
import {SetActiveSeasonDAO} from "../Interfaces/SetActiveSeasonDAO";

export class SetActiveSeason implements IUseCase<SetActiveSeasonCommand,void>{
    constructor(private persistance: SetActiveSeasonDAO){

    }

    execute(request: SetActiveSeasonCommand): Promise<void> {
        console.log('setting current active season',request)
        return this.persistance.set(request);
    }
}