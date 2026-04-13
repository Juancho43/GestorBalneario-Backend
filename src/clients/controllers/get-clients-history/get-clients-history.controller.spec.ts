import { Test, TestingModule } from '@nestjs/testing';
import { GetClientsHistoryController } from './get-clients-history.controller';

describe('GetClientsHistoryController', () => {
  let controller: GetClientsHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetClientsHistoryController],
    }).compile();

    controller = module.get<GetClientsHistoryController>(GetClientsHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
