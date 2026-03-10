import { Test, TestingModule } from '@nestjs/testing';
import { DeleteShadowController } from './delete-shadow.controller';

describe('DeleteShadowController', () => {
  let controller: DeleteShadowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteShadowController],
    }).compile();

    controller = module.get<DeleteShadowController>(DeleteShadowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
