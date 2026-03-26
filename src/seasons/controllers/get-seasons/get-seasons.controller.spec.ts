import { Test, TestingModule } from '@nestjs/testing';
import { GetSeasonsController } from './get-seasons.controller';

describe('GetSeasonsController', () => {
  let controller: GetSeasonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetSeasonsController],
    }).compile();

    controller = module.get<GetSeasonsController>(GetSeasonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
