import {CreateClientCommand} from "./CreateClientCommand";

export class UpdateClientCommand{
    constructor(public id: string, public data: CreateClientCommand) {
    }
}