import { Test, TestingModule } from '@nestjs/testing';
import { CloneSeasonService } from './clone-season.service';

describe('CloneSeasonService', () => {
  let service: CloneSeasonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloneSeasonService],
    }).compile();

    service = module.get<CloneSeasonService>(CloneSeasonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
