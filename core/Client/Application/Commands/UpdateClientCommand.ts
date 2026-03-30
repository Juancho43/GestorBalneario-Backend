import {CreateClientCommand} from "./CreateClientCommand";
export class UpdateClientCommand{
    /**
     * Id of the client to edit
     * @example "client-123"
     * */
    id:string;
    /**
     * Data of the client
     * */
    data:CreateClientCommand;
    /*
    * Date of creation
    * @example: '2026-01-10'
    * */
    createdAt:string;
}