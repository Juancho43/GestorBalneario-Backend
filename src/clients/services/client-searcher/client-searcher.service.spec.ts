import { Test, TestingModule } from '@nestjs/testing';
import { ClientSearcherService } from './client-searcher.service';

describe('ClientSearcherService', () => {
  let service: ClientSearcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientSearcherService],
    }).compile();

    service = module.get<ClientSearcherService>(ClientSearcherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
