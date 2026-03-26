import { Test, TestingModule } from '@nestjs/testing';
import { GetSeasonsService } from './get-seasons.service';

describe('GetSeasonsService', () => {
  let service: GetSeasonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetSeasonsService],
    }).compile();

    service = module.get<GetSeasonsService>(GetSeasonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
