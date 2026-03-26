import { Test, TestingModule } from '@nestjs/testing';
import { CreateSeasonService } from './create-season.service';

describe('CreateSeasonService', () => {
  let service: CreateSeasonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateSeasonService],
    }).compile();

    service = module.get<CreateSeasonService>(CreateSeasonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
