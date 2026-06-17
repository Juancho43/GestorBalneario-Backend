import { Test, TestingModule } from '@nestjs/testing';
import { GetSeasonDetailsService } from './get-season-details.service';

describe('GetSeasonDetailsService', () => {
  let service: GetSeasonDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetSeasonDetailsService],
    }).compile();

    service = module.get<GetSeasonDetailsService>(GetSeasonDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
