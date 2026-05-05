import {Test, TestingModule} from '@nestjs/testing';
import {DeleteSeasonController} from './delete-season.controller';

describe('DeleteSeasonController', () => {
  let controller: DeleteSeasonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteSeasonController],
    }).compile();

    controller = module.get<DeleteSeasonController>(DeleteSeasonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
