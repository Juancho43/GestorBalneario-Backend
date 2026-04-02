import { Test, TestingModule } from '@nestjs/testing';
import { GetSeasonServicesService } from './get-season-services.service';

describe('GetSeasonServicesService', () => {
  let service: GetSeasonServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetSeasonServicesService],
    }).compile();

    service = module.get<GetSeasonServicesService>(GetSeasonServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
