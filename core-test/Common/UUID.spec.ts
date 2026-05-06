import {UUID} from '../../core/common/Model/UUID';

describe('UUID Value Object', () => {
  it('should be created', () => {
    const id = UUID.create();
    expect(id).toBeDefined();
    expect(id).toBeInstanceOf(UUID);
    expect(id.value).toBeDefined();
  });
  it('Should fail if is not a valid UUID', () => {
    expect(() => UUID.restore('invalid-uuid')).toThrow();
  });
});
