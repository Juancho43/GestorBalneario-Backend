import {CreateShadowCommand} from "./CreateShadowCommand";

export class UpdateShadowCommand{
    constructor(
        public id: string,
        public data: CreateShadowCommand,
    ) {
    }
}