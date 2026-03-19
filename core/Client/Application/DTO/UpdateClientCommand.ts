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
}