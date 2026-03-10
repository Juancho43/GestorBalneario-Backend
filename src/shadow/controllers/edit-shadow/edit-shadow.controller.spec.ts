import { Test, TestingModule } from '@nestjs/testing';
import { EditShadowController } from './edit-shadow.controller';

describe('EditShadowController', () => {
  let controller: EditShadowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EditShadowController],
    }).compile();

    controller = module.get<EditShadowController>(EditShadowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
