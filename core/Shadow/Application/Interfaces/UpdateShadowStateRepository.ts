import {Shadow} from "../../Model/Shadow";

export interface UpdateShadowStateRepository {
    update(shadows: Shadow[]): Promise<void>
}