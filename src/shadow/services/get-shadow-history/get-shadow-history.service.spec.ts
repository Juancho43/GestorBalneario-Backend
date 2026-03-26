import { Test, TestingModule } from '@nestjs/testing';
import { GetShadowHistoryService } from './get-shadow-history.service';

describe('GetShadowHistoryService', () => {
  let service: GetShadowHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetShadowHistoryService],
    }).compile();

    service = module.get<GetShadowHistoryService>(GetShadowHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
