import {ShadowState} from './ShadowState';
import {Shadow} from '../Shadow';

export class BookedState implements ShadowState {
  constructor(private readonly shadow: Shadow) {}

  update(): void {
    throw new Error('Cannot modify a shadow that is currently booked.');
  }

  delete(): void {
    throw new Error('Cannot delete a shadow that is currently booked.');
  }

  getShadow(): Shadow {
    return this.shadow;
  }
  toString(): string {
    return BookedState.name;
  }
}
