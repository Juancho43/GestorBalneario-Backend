import { Test, TestingModule } from '@nestjs/testing';
import { GetSeasonDetailsController } from './get-season-details.controller';

describe('GetSeasonDetailsController', () => {
  let controller: GetSeasonDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetSeasonDetailsController],
    }).compile();

    controller = module.get<GetSeasonDetailsController>(GetSeasonDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
