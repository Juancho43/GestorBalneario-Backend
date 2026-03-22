import {UniqueIdentifier} from "./common/Model/UniqueIdentifier";

export class Invoice{
    private id: UniqueIdentifier;
    private date: Date;
    private amount: number;
    private clientId: UniqueIdentifier;
}