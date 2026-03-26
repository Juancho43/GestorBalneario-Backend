import {ShadowMapDTO} from "./DTO/ShadowMapDTO";

export interface ShadowMapDAO {
    get(): Promise<ShadowMapDTO>;
}