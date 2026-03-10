import { Test, TestingModule } from '@nestjs/testing';
import { DeleteShadowService } from './delete-shadow.service';

describe('DeleteShadowService', () => {
  let service: DeleteShadowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteShadowService],
    }).compile();

    service = module.get<DeleteShadowService>(DeleteShadowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
