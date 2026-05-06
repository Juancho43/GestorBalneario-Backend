import {SetActiveSeasonCommand} from '../Commads/SetActiveSeasonCommand';

export interface SetActiveSeasonDAO {
  set(command: SetActiveSeasonCommand): Promise<void>;
}
