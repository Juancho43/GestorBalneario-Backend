import { Test, TestingModule } from '@nestjs/testing';
import { CreateSeasonController } from './create-season.controller';

describe('CreateSeasonController', () => {
  let controller: CreateSeasonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateSeasonController],
    }).compile();

    controller = module.get<CreateSeasonController>(CreateSeasonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
