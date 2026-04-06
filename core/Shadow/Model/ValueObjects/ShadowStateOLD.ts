export class ShadowStateOLD {
    private _state: string;
    private static _validStates: string[] = ['available', 'unavailable'];
    private constructor(state: string) {
        this._state = state;
    }
   static validateState(state: string): boolean {
        return this._validStates.includes(state);
   }

    static create(state: string): ShadowStateOLD {
        if (!this.validateState(state)) {
            throw new Error(`Invalid shadow state: ${state}. Valid states are: ${this._validStates.join(', ')}`);
        }
        return new ShadowStateOLD(state);
    }

    get state(): string {
        return this._state;
    }

    static get validStates(): string[] {
        return this._validStates;
    }
}
