import { Test, TestingModule } from '@nestjs/testing';
import { GetShadowMapController } from './get-shadow-map.controller';

describe('GetShadowMapController', () => {
  let controller: GetShadowMapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetShadowMapController],
    }).compile();

    controller = module.get<GetShadowMapController>(GetShadowMapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
