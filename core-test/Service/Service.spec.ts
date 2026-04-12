import { ServiceMother } from '../mothers/ServiceMother';
import { StringObject } from '../../core/common/Model/StringObject';
import { MoneyMother } from '../mothers/MoneyMother';
import { UUID } from '../../core/common/Model/UUID';
import { Currency } from '../../core/Payment/Model/Money';

describe('Service', () => {
  it('should create a service with default values', () => {
    const service = ServiceMother.create({
      name: StringObject.create('Default Service'),
    });
    expect(service).toBeDefined();
    expect(service.id).toBeInstanceOf(UUID);
    expect(service.name.getValue()).toBe('Default Service');
    expect(service.price.amount).toBe(1500);
    expect(service.price.currency).toBe(Currency.ARS);
  });

  it('should create a service and getters should work', () => {
    const id = UUID.create();
    const name = StringObject.create('Carpa');
    const price = MoneyMother.create(25, 1, Currency.USD);
    const service = ServiceMother.create({ id: id, name: name, price: price });

    expect(service.id).toEqual(id);
    expect(service.name).toEqual(name);
    expect(service.price).toEqual(price);
    expect(service.timestamp).toBeDefined();
    expect(service.softDelete).toBeDefined();
  });

  it('should allow creating a service with a specific price', () => {
    const price = MoneyMother.create(500);
    const service = ServiceMother.create({ price: price });
    expect(service.price).toEqual(price);
  });

  it('should allow creating a service with a specific name', () => {
    const name = StringObject.create('Carpa');
    const service = ServiceMother.create({ name: name });
    expect(service.name).toEqual(name);
  });
});
