import {SoftDelete} from '../../core/common/Model/SoftDelete';

describe('SoftDelete Value Object', () => {
  let object: SoftDelete;
  beforeEach(() => {
    object = SoftDelete.empty();
  });
  it('Should be created', () => {
    expect(object).toBeInstanceOf(SoftDelete);
  });
  it('Should be restored', () => {
    const date = new Date();
    object = SoftDelete.restore(date);
    expect(object.value).toEqual(date);
  });
  it('Should applied soft delete', () => {
  object.apply();
    expect(object.isDeleted).toEqual(true);
  });
  it('Should undo soft delete', () => {
    object.apply();
     object.undo();
    expect(object.isDeleted).toEqual(false);
  });
});
