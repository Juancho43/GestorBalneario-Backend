import { Test, TestingModule } from '@nestjs/testing';
import { SeasonsClientsDebtService } from './seasons-clients-debt.service';

describe('SeasonsClientsDebtService', () => {
  let service: SeasonsClientsDebtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeasonsClientsDebtService],
    }).compile();

    service = module.get<SeasonsClientsDebtService>(SeasonsClientsDebtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
