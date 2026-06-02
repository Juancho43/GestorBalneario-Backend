import {ShadowSearchQuery} from "../../Application/Queries/ShadowSearchQuery";
import {ShadowResponse} from "../../Application/Response/ShadowResponse";

export interface ShadowSearchDAO {
    search(query: ShadowSearchQuery): Promise<ShadowResponse[]>;
}