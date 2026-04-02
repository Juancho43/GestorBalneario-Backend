import { Test, TestingModule } from '@nestjs/testing';
import { SetActiveSeasonService } from './set-active-season.service';

describe('SetActiveSeasonService', () => {
  let service: SetActiveSeasonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SetActiveSeasonService],
    }).compile();

    service = module.get<SetActiveSeasonService>(SetActiveSeasonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
