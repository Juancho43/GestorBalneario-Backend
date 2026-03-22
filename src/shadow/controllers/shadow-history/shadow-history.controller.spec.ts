import { Test, TestingModule } from '@nestjs/testing';
import { ShadowHistoryController } from './shadow-history.controller';

describe('ShadowHistoryController', () => {
  let controller: ShadowHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShadowHistoryController],
    }).compile();

    controller = module.get<ShadowHistoryController>(ShadowHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
