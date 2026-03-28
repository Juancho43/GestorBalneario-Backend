import { Test, TestingModule } from '@nestjs/testing';
import { GetServiceService } from './get-service.service';

describe('GetServiceService', () => {
  let service: GetServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetServiceService],
    }).compile();

    service = module.get<GetServiceService>(GetServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
