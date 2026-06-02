import {Test, TestingModule} from '@nestjs/testing';
import {SeasonSearcherController} from './season-searcher.controller';

describe('SeasonSearcherController', () => {
  let controller: SeasonSearcherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeasonSearcherController],
    }).compile();

    controller = module.get<SeasonSearcherController>(SeasonSearcherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
