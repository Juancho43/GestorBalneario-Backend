import { Test, TestingModule } from '@nestjs/testing';
import { GetByIdShadowController } from './get-by-id-shadow.controller';

describe('GetByIdShadowController', () => {
  let controller: GetByIdShadowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetByIdShadowController],
    }).compile();

    controller = module.get<GetByIdShadowController>(GetByIdShadowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
