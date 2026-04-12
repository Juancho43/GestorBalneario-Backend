import { UUID } from '../../common/Model/UUID';
import { InvoiceItem } from './InvoiceItem';
import { Money } from '../../Payment/Model/Money';
import { Payment } from '../../Payment/Model/Payment';
import { Timestamps } from '../../common/Model/Timestamps';
import { SoftDelete } from '../../common/Model/SoftDelete';
import { InvoiceState } from './InvoiceState';
import { IssuedState } from './IssuedState';
import { Entity } from '../../common/Model/Entity';

export class Invoice implements Entity {
  private readonly _id: UUID;
  private readonly _date: Date;
  private readonly _clientId: UUID;
  private _amount: Money;
  private _state: InvoiceState;
  private _items: InvoiceItem[] = [];
  private _payments: Payment[] = [];
  private readonly _timestamps: Timestamps;
  private readonly _softDelete: SoftDelete;

  private constructor(
    id: UUID,
    date: Date,
    clientId: UUID,
    timestamps: Timestamps,
    softDelete: SoftDelete,
  ) {
    this._id = id;
    this._date = date;
    this._clientId = clientId;
    this._state = new IssuedState(this);
    this._amount = Money.create(1);
    this._timestamps = timestamps;
    this._softDelete = softDelete;
  }

  delete(): void {
    this._state.delete();
  }
  update(): void {
    this._state.update();
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
    date: Date,
    clientId: UUID,
    timestamps: Timestamps,
    softDelete: SoftDelete,
  ) {
    return new Invoice(id, date, clientId, timestamps, softDelete);
  }

  updateAmount() {
    this._amount = Money.create(this.calculateTotalAmount());
  }

  calculateDebt() {
    return this._amount.finalAmount - this.calculateTotalPaid();
  }
  calculateTotalAmount(): number {
    return this._items.reduce((total, item) => item.getPrice().finalAmount, 0);
  }

  calculateTotalPaid(): number {
    return this._payments.reduce((total, p) => total + p.finalAmount, 0);
  }

  addItem(item: InvoiceItem) {
    this._state.addItem(item);
  }

  addPayment(payment: Payment) {
    this._state.addPayment(payment);
  }
  set state(state: InvoiceState) {
    this._state = state;
  }

  get state(): InvoiceState {
    return this._state;
  }
  get id(): UUID {
    return this._id;
  }

  get date(): Date {
    return this._date;
  }

  get amount(): Money {
    return this._amount;
  }

  get clientId(): UUID {
    return this._clientId;
  }

  get items(): InvoiceItem[] {
    return this._items;
  }

  get payments(): Payment[] {
    return this._payments;
  }

  get timestamps(): Timestamps {
    return this._timestamps;
  }

  get softDelete(): SoftDelete {
    return this._softDelete;
  }
}
