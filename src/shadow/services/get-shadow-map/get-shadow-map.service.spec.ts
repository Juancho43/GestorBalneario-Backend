import { Test, TestingModule } from '@nestjs/testing';
import { GetShadowMapService } from './get-shadow-map.service';

describe('GetShadowMapService', () => {
  let service: GetShadowMapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetShadowMapService],
    }).compile();

    service = module.get<GetShadowMapService>(GetShadowMapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
