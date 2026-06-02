import {Test, TestingModule} from '@nestjs/testing';
import {ServiceSearcherService} from './service-searcher.service';

describe('ServiceSearcherService', () => {
  let service: ServiceSearcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceSearcherService],
    }).compile();

    service = module.get<ServiceSearcherService>(ServiceSearcherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
