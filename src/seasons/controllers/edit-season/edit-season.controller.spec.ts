import {Test, TestingModule} from '@nestjs/testing';
import {EditSeasonController} from './edit-season.controller';

describe('EditSeasonController', () => {
  let controller: EditSeasonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EditSeasonController],
    }).compile();

    controller = module.get<EditSeasonController>(EditSeasonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
