import { Test, TestingModule } from '@nestjs/testing';
import { SeasonHistoryController } from './season-history.controller';

describe('SeasonHistoryController', () => {
  let controller: SeasonHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeasonHistoryController],
    }).compile();

    controller = module.get<SeasonHistoryController>(SeasonHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
