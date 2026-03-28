import { Test, TestingModule } from '@nestjs/testing';
import { GetsServicesService } from './gets-services.service';

describe('GetsServicesService', () => {
  let service: GetsServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetsServicesService],
    }).compile();

    service = module.get<GetsServicesService>(GetsServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
