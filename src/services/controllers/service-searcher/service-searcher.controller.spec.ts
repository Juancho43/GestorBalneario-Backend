import {Test, TestingModule} from '@nestjs/testing';
import {ServiceSearcherController} from './service-searcher.controller';

describe('ServiceSearcherController', () => {
  let controller: ServiceSearcherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceSearcherController],
    }).compile();

    controller = module.get<ServiceSearcherController>(ServiceSearcherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
