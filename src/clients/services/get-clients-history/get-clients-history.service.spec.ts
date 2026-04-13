import { Test, TestingModule } from '@nestjs/testing';
import { GetClientsHistoryService } from './get-clients-history.service';

describe('GetClientsHistoryService', () => {
  let service: GetClientsHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetClientsHistoryService],
    }).compile();

    service = module.get<GetClientsHistoryService>(GetClientsHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
