import {CreateShadowCommand} from "./CreateShadowCommand";

export class UpdateShadowCommand{
    /**
     * Id for the shadow to update
     * */
    id:string;

    data:CreateShadowCommand;

    /*
  * Date of creation
  * @example: '2026-01-10'
  * */
    createdAt:string;
}