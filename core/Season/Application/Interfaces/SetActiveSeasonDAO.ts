import {SetActiveSeasonCommand} from "../Commads/SetActiveSeasonCommand";
import {Season} from "../../Model/Season";

export interface SetActiveSeasonDAO {
    set(command: SetActiveSeasonCommand): Promise<void>;
}