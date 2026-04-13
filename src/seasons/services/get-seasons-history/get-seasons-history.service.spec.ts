import { Test, TestingModule } from '@nestjs/testing';
import { GetSeasonsHistoryService } from './get-seasons-history.service';

describe('GetSeasonsHistoryService', () => {
  let service: GetSeasonsHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetSeasonsHistoryService],
    }).compile();

    service = module.get<GetSeasonsHistoryService>(GetSeasonsHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
