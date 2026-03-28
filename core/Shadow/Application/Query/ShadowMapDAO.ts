import {ShadowMapDTO} from "../Response/ShadowMapDTO";

export interface ShadowMapDAO {
    get(): Promise<ShadowMapDTO>;
}