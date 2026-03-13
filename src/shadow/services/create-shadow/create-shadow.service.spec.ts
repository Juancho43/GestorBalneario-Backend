import { Test, TestingModule } from '@nestjs/testing';
import { CreateShadowService } from './create-shadow.service';

describe('CreateShadowService', () => {
  let service: CreateShadowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateShadowService],
    }).compile();

    service = module.get<CreateShadowService>(CreateShadowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
