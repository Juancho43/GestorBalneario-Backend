import {Shadow} from '../../Model/Shadow';
import {TimeStampResponse} from '../../../common/Application/TimeStampResponse';

export class ShadowResponse extends TimeStampResponse {
  /**
   * Unique identifier for the shadow.
   * @example "shadow-123"
   */
  id: string;

  /**
   * Identifier for the shadow.
   * @example "S1"
   */
  identifier: string;

  /**
   * Type of the shadow.
   * @example "Sombrilla"
   */
  type: string;

  /**
   * Coordinates of the shadow for the canvas.
   * @example { "x": 100, "y": 200 }
   */
  coords: { x: number; y: number };

  /**
   * Current state of the shadow.
   * @example "available"
   */
  state: string;

  /**
   * Creates a ShadowResponse from a Shadow model.
   * @param {Shadow} shadow - The shadow model.
   * @returns {ShadowResponse} The shadow response.
   */
  static create(shadow: Shadow): ShadowResponse {
    const response = new ShadowResponse();
    response.id = shadow.id.value;
    response.identifier = shadow.identifier.getValue();
    response.type = shadow.type.type;
    response.coords = { x: shadow.coords.getX(), y: shadow.coords.getY() };
    response.state = shadow.isAvailable(new Date()) ? 'available' : 'occupied';
    response.create_at = shadow.timestamp.createdAt.toISOString();
    response.updated_at = shadow.timestamp.updatedAt.toISOString();
    return response;
  }

  /**
   * Creates a list of ShadowResponses from a list of Shadow models.
   * @param {Shadow[]} shadows - The list of shadow models.
   * @returns {ShadowResponse[]} The list of shadow responses.
   */
  static createList(shadows: Shadow[]): ShadowResponse[] {
    return shadows.map((shadow) => ShadowResponse.create(shadow));
  }
}
