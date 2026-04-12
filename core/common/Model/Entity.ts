import { Timestamps } from './Timestamps';
import { SoftDelete } from './SoftDelete';
import { UUID } from './UUID';

export interface Entity {
  delete(): void;
  update(): void;
  getId(): UUID;
  getTimestamps(): Timestamps;
  getSoftDelete(): SoftDelete;
}
