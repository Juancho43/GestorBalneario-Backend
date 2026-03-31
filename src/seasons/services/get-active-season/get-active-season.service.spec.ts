import { Test, TestingModule } from '@nestjs/testing';
import { GetActiveSeasonService } from './get-active-season.service';

describe('GetActiveSeasonService', () => {
  let service: GetActiveSeasonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetActiveSeasonService],
    }).compile();

    service = module.get<GetActiveSeasonService>(GetActiveSeasonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
