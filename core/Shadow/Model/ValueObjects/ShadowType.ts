export class ShadowType{
    private _type: string;

    private constructor(type: string) {
        this._type = type;
    }

    static create(type: string): ShadowType {
        return new ShadowType(type);
    }




    get type(): string {
        return this._type;
    }


}