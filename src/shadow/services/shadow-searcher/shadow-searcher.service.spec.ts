import {Test, TestingModule} from '@nestjs/testing';
import {ShadowSearcherService} from './shadow-searcher.service';

describe('ShadowSearcherService', () => {
  let service: ShadowSearcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShadowSearcherService],
    }).compile();

    service = module.get<ShadowSearcherService>(ShadowSearcherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
