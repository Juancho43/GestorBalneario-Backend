export class CreateShadowCommand {
    constructor(
        public readonly type: string,
        public readonly identifier: string,
        public readonly state: string,
        public readonly x: number,
        public readonly y: number
    ) {
    }
}