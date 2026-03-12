import { Test, TestingModule } from '@nestjs/testing';
import { GetShadowService } from './get-shadow.service';

describe('GetShadowService', () => {
  let service: GetShadowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetShadowService],
    }).compile();

    service = module.get<GetShadowService>(GetShadowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
