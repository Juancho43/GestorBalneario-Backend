import { SoftDelete } from '../../core/common/Model/SoftDelete';

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
    const objectDeleted = object.apply();
    expect(objectDeleted.isDeleted).toEqual(true);
  });
  it('Should undo soft delete', () => {
    const objectToTest = object.apply();
    const notDeleted = objectToTest.undo();
    expect(notDeleted.isDeleted).toEqual(false);
  });
});
