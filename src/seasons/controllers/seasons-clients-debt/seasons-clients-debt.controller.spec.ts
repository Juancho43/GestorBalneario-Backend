import { Test, TestingModule } from '@nestjs/testing';
import { SeasonsClientsDebtController } from './seasons-clients-debt.controller';

describe('SeasonsClientsDebtController', () => {
  let controller: SeasonsClientsDebtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeasonsClientsDebtController],
    }).compile();

    controller = module.get<SeasonsClientsDebtController>(SeasonsClientsDebtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
