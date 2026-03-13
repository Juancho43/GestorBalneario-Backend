export class Coords{
    private readonly x: number;
    private readonly y: number;

    private constructor(x: number, y: number) {
        if (!Number.isFinite(x) || !Number.isFinite(y)) {
            throw new Error(`Invalid Coords: x and y must be finite numbers`);
        }
        if (x < 0 || y < 0) {
        throw new Error(`Invalid Coords: x and y must be non-negative`);
        }
        this.x = x;
        this.y = y;
    }
    static create(x: number, y: number): Coords {
        return new Coords(x, y);
    }
     getX(): number {
        return this.x;
    }

     getY(): number {
        return this.y;
    }
}