import { Test, TestingModule } from '@nestjs/testing';
import { GetSeasonService } from './get-season.service';

describe('GetSeasonService', () => {
  let service: GetSeasonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetSeasonService],
    }).compile();

    service = module.get<GetSeasonService>(GetSeasonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
