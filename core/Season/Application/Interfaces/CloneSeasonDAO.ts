import {CloneSeasonDTO} from '../DTO/CloneSeasonDTO';

export interface CloneSeasonDAO {
  save(dto: CloneSeasonDTO): Promise<void>;
}
