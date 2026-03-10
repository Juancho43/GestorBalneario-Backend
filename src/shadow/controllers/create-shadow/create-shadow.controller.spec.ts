import { Test, TestingModule } from '@nestjs/testing';
import { CreateShadowController } from './create-shadow.controller';

describe('CreateShadowController', () => {
  let controller: CreateShadowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateShadowController],
    }).compile();

    controller = module.get<CreateShadowController>(CreateShadowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
