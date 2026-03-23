import {ShadowMapDTO} from "./DTO/ShadowMapDTO";

export interface ShadowMapQuery {
    get(): Promise<ShadowMapDTO>;
}