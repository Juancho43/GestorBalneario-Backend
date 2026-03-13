export class CreateShadowCommand {
    constructor(
        public readonly type: string,
        public readonly identifier: string,
        public readonly state: string,
        public readonly coords: {x: number, y:number}
    ) {
    }
}