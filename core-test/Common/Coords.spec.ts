import {Coords} from '../../core/common/Model/Coords';

describe('Coords Value Object', () => {
  it('Should be created', () => {
    const coords = Coords.create(10, 20);
    expect(coords).toBeInstanceOf(Coords);
    expect(coords.getX()).toBe(10);
    expect(coords.getY()).toBe(20);
  });
  it('Should fail if cords are negative', () => {
    expect(() => Coords.create(-10, 20)).toThrow();
  });
  it('Should fail if cords are not finite', () => {
    expect(() => Coords.create(10, {} as number)).toThrow();
  });
});
