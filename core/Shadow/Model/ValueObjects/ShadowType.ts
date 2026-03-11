export class ShadowType{
    private type: string;
    private shape: string;

    private constructor(type: string, shape: string) {
        this.type = type;
        this.shape = shape;
    }

    static create(type: string): ShadowType {
        const shape = this.getShapeByType(type);
        return new ShadowType(type, shape);
    }

    private static getShapeByType(type: string): string {
        switch (type) {
            case 'sombrilla':
                return 'circle';
            case 'carpa':
                return 'rect';
            default:
                throw new Error(`Unknown shadow type: ${type}`);
        }
    }
}