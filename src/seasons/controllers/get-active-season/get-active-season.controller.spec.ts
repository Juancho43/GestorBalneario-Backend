import {Test, TestingModule} from '@nestjs/testing';
import {GetActiveSeasonController} from './get-active-season.controller';

describe('GetActiveSeasonController', () => {
  let controller: GetActiveSeasonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetActiveSeasonController],
    }).compile();

    controller = module.get<GetActiveSeasonController>(
      GetActiveSeasonController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
