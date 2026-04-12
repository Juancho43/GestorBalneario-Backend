/**
 * Represents the command to create a new shadow.
 */
export class CreateShadowCommand {
  /**
   * The type of the shadow.
   * @example "Carpa"
   * @type {string}
   */
  type: string;

  /**
   * The unique identifier for the shadow.
   * @example "C1"
   * @type {string}
   */
  identifier: string;

  /**
   * The state of the shadow.
   * @example "available"
   * @type {string}
   */
  state: string;

  coords: Coords;

  constructor(type: string, identifier: string, state: string, coords: Coords) {
    this.type = type;
    this.identifier = identifier;
    this.state = state;
    this.coords = coords;
  }
}

class Coords {
  /*
   * Left position of the shadow in the canvas
   * @example 220
   * */
  x: number;
  /**
   * Top position of the shadow in the canvas
   * @example 20
   * */
  y: number;
}
