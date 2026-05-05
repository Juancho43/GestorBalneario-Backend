import {Test, TestingModule} from '@nestjs/testing';
import {CloneSeasonController} from './clone-season.controller';

describe('CloneSeasonController', () => {
  let controller: CloneSeasonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CloneSeasonController],
    }).compile();

    controller = module.get<CloneSeasonController>(CloneSeasonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
