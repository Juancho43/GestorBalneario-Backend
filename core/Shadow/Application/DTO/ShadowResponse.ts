import {Shadow} from "../../Model/Shadow";

export class ShadowResponse{
    static create(shadow: Shadow){
        return {
            id: shadow.id,
            identifier: shadow.identifier.getValue(),
            name: shadow.type.shape,
            type: shadow.type.type,
            coords: shadow.coords,
            state: shadow.state.state,
        }

    }
    static createList(shadows: Shadow[]){
        return shadows.map((shadow) => {
            return ShadowResponse.create(shadow);
        })
    }
}