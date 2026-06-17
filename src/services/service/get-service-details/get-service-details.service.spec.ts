import { Test, TestingModule } from '@nestjs/testing';
import { GetServiceDetailsService } from './get-service-details.service';

describe('GetServiceDetailsService', () => {
  let service: GetServiceDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetServiceDetailsService],
    }).compile();

    service = module.get<GetServiceDetailsService>(GetServiceDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
