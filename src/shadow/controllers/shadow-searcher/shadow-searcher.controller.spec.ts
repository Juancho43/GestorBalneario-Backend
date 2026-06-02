import {Test, TestingModule} from '@nestjs/testing';
import {ShadowSearcherController} from './shadow-searcher.controller';

describe('ShadowSearcherController', () => {
  let controller: ShadowSearcherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShadowSearcherController],
    }).compile();

    controller = module.get<ShadowSearcherController>(ShadowSearcherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
