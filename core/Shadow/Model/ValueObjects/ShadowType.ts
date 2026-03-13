export class ShadowType{
    private _type: string;
    private _shape: string;

    private constructor(type: string, shape: string) {
        this._type = type;
        this._shape = shape;
    }

    static create(type: string): ShadowType {
        const shape = this.getShapeByType(type);
        return new ShadowType(type, shape);
    }

    private static getShapeByType(type: string): string {
        switch (type) {
            case 'circle':
                return 'sombrilla';
            case 'rect':
                return 'carpa';
            default:
                throw new Error(`Unknown shadow type: ${type}`);
        }
    }


    get type(): string {
        return this._type;
    }

    get shape(): string {
        return this._shape;
    }
}