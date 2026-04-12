import { UUID } from '../../common/Model/UUID';
import { Timestamps } from '../../common/Model/Timestamps';
import { SoftDelete } from '../../common/Model/SoftDelete';
import { StringObject } from '../../common/Model/StringObject';
import { InvalidDatesError } from '../../common/Model/Errors/InvalidDates';
import { Entity } from '../../common/Model/Entity';

export class Season implements Entity {
  private readonly _id: UUID;
  private readonly _startDate: Date;
  private readonly _endDate: Date;
  private readonly _name: StringObject;
  private _isActive: boolean = false;
  private readonly _timestamps: Timestamps;
  private readonly _softDelete: SoftDelete;

  private constructor(
    id: UUID,
    isActive: boolean,
    startDate: Date,
    endDate: Date,
    name: StringObject,
    timestamps: Timestamps,
    softDelete: SoftDelete,
  ) {
    this._id = id;
    this._isActive = isActive;
    this._startDate = startDate;
    this._endDate = endDate;
    this._name = name;
    this._timestamps = timestamps;
    this._softDelete = softDelete;
  }

  delete(): void {
    this.softDelete.apply();
  }
  update(): void {
    this.timestamps.update();
  }

  getId(): UUID {
    return this._id;
  }
  getTimestamps(): Timestamps {
    return this._timestamps;
  }
  getSoftDelete(): SoftDelete {
    return this._softDelete;
  }

  static create(
    id: UUID,
    isActive: boolean,
    startDate: Date,
    endDate: Date,
    name: StringObject,
    timestamps: Timestamps,
    softDelete: SoftDelete,
  ): Season {
    if (endDate <= startDate) {
      throw new InvalidDatesError(startDate, endDate);
    }
    return new Season(
      id,
      isActive,
      startDate,
      endDate,
      name,
      timestamps,
      softDelete,
    );
  }
  toggleActive() {
    this._isActive = !this._isActive;
  }
  get isActive() {
    return this._isActive;
  }
  get timestamps(): Timestamps {
    return this._timestamps;
  }

  get softDelete(): SoftDelete {
    return this._softDelete;
  }

  get id(): UUID {
    return this._id;
  }

  get startDate(): Date {
    return this._startDate;
  }

  get endDate(): Date {
    return this._endDate;
  }

  get name(): StringObject {
    return this._name;
  }
}
