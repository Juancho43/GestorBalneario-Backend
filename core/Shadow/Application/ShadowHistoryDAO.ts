import {ShadowHistoryDTO} from "./DTO/ShadowHistoryDTO";

export interface ShadowHistoryDAO {
    get(id: string,page:number,limit:number): Promise<ShadowHistoryDTO>
}