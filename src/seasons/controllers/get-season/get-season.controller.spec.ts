import { Test, TestingModule } from '@nestjs/testing';
import { GetSeasonController } from './get-season.controller';

describe('GetSeasonController', () => {
  let controller: GetSeasonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetSeasonController],
    }).compile();

    controller = module.get<GetSeasonController>(GetSeasonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
