import {Shadow} from "../Shadow";

export interface ShadowState {
    getShadow(): Shadow;
    update(): void;
    delete(): void;
    toString(): string;
}