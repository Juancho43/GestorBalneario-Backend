export class ShadowState{
    private state: string;
    static validStates: string[] = ['active', 'inactive', 'maintenance'];
    constructor(state: string) {
        this.state = state;
    }
   static validateState(state: string): boolean {
        return this.validStates.includes(state);
   }


}
