import {UUID} from '../../common/Model/UUID';
import {StringObject} from '../../common/Model/StringObject';
import {Money} from '../../Payment/Model/Money';
import {Timestamps} from '../../common/Model/Timestamps';
import {SoftDelete} from '../../common/Model/SoftDelete';
import {Prototype} from '../../common/Model/Prototype';
import {Entity} from '../../common/Model/Entity';
import {ServiceCategory} from "./ServiceCategory";

export class Service implements Prototype<Service>, Entity {
  private readonly _id: UUID;
  private readonly _seasonId: UUID;
  private readonly _name: StringObject;
  private readonly _price: Money;
  private readonly _type: ServiceCategory;
  private readonly _timestamp: Timestamps;
  private readonly _softDelete: SoftDelete;

  private constructor(
    id: UUID,
    seasonId: UUID,
    name: StringObject,
    price: Money,
    type: ServiceCategory,
    timestamp: Timestamps,
    softDelete: SoftDelete,
  ) {
    this._id = id;
    this._seasonId = seasonId;
    this._name = name;
    this._price = price;
    this._type = type;
    this._timestamp = timestamp;
    this._softDelete = softDelete;
  }

  delete(): void {
    this.softDelete.apply();
  }
  update(): void {
    this.timestamp.update();
  }

  getId(): UUID {
    return this._id;
  }

  getTimestamps(): Timestamps {
    return this._timestamp;
  }
  getSoftDelete(): SoftDelete {
    return this._softDelete;
  }

  clone(): Service {
    return new Service(
      UUID.create(),
      this._seasonId,
      this._name,
      this._price,
      this._type,
      Timestamps.create(),
      SoftDelete.empty(),
    );
  }

  static create(
    id: UUID,
    seasonId: UUID,
    name: StringObject,
    price: Money,
    type: ServiceCategory,
    timestamp: Timestamps,
    softDelete: SoftDelete,
  ) {
    return new Service(id, seasonId, name, price,type, timestamp, softDelete);
  }
  get timestamp(): Timestamps {
    return this._timestamp;
  }

  get softDelete(): SoftDelete {
    return this._softDelete;
  }

  get id(): UUID {
    return this._id;
  }

  get name(): StringObject {
    return this._name;
  }

  get price(): Money {
    return this._price;
  }
  get type(): ServiceCategory {
    return this._type;
  }
  get seasonId(): UUID {
    return this._seasonId;
  }
}
