import { Test, TestingModule } from '@nestjs/testing';
import { GetCurrentShadowsController } from './get-current-shadows.controller';

describe('GetCurrentShadowsController', () => {
  let controller: GetCurrentShadowsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetCurrentShadowsController],
    }).compile();

    controller = module.get<GetCurrentShadowsController>(GetCurrentShadowsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
