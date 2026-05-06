import {ShadowState} from './ShadowState';
import {Shadow} from '../Shadow';

export class AvailableState implements ShadowState {
  private readonly shadow: Shadow;

  constructor(shadow: Shadow) {
    this.shadow = shadow;
  }

  update(): void {
    this.shadow.timestamp.update();
  }

  delete(): void {
    this.shadow.softDelete.apply();
  }

  getShadow(): Shadow {
    return this.shadow;
  }
  toString(): string {
    return AvailableState.name;
  }
}
