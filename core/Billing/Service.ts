import {UUID} from "../common/Model/UUID";
import {StringObject} from "../common/Model/StringObject";
import {Money} from "../Payment/Model/Money";

export class Service{
    private id : UUID;
    private name : StringObject;
    private price: Money;
    private seasonId: UUID;
}