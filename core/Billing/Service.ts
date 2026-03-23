import {UniqueIdentifier} from "../common/Model/UniqueIdentifier";
import {StringObject} from "../common/Model/StringObject";
import {Money} from "../Payment/Model/Money";

export class Service{
    private id : UniqueIdentifier;
    private name : StringObject;
    private price: Money;
    private seasonId: UniqueIdentifier;
}