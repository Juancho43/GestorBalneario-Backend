import {Test, TestingModule} from '@nestjs/testing';
import {SeasonSearcherService} from './season-searcher.service';

describe('SeasonSearcherService', () => {
  let service: SeasonSearcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeasonSearcherService],
    }).compile();

    service = module.get<SeasonSearcherService>(SeasonSearcherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
