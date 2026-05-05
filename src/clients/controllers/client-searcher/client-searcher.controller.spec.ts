import {Test, TestingModule} from '@nestjs/testing';
import {ClientSearcherController} from './client-searcher.controller';

describe('ClientSearcherController', () => {
  let controller: ClientSearcherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientSearcherController],
    }).compile();

    controller = module.get<ClientSearcherController>(ClientSearcherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
