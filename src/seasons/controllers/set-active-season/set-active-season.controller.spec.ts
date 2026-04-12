import { Test, TestingModule } from '@nestjs/testing';
import { SetActiveSeasonController } from './set-active-season.controller';

describe('SetActiveSeasonController', () => {
  let controller: SetActiveSeasonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SetActiveSeasonController],
    }).compile();

    controller = module.get<SetActiveSeasonController>(
      SetActiveSeasonController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
