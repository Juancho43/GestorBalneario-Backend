import {CreateShadowCommand} from "./CreateShadowCommand";

export class UpdateShadowCommand{
    /**
     * Id for the shadow to update
     * */
    id:string;

    data:CreateShadowCommand;
}