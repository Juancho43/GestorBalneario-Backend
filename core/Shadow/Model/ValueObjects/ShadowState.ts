export class ShadowState{
    private state: string;
    static validStates: string[] = ['active', 'inactive', 'maintenance'];
    private constructor(state: string) {
        this.state = state;
    }
   static validateState(state: string): boolean {
        return this.validStates.includes(state);
   }

    static create(state: string): ShadowState {
        if (!this.validateState(state)) {
            throw new Error(`Invalid shadow state: ${state}. Valid states are: ${this.validStates.join(', ')}`);
        }
        return new ShadowState(state);
    }

}
