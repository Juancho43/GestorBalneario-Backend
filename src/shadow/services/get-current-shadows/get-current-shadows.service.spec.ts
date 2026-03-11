import { Test, TestingModule } from '@nestjs/testing';
import { GetCurrentShadowsService } from './get-current-shadows.service';

describe('GetCurrentShadowsService', () => {
  let service: GetCurrentShadowsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetCurrentShadowsService],
    }).compile();

    service = module.get<GetCurrentShadowsService>(GetCurrentShadowsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
