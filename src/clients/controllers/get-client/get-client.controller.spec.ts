import { Test, TestingModule } from '@nestjs/testing';
import { GetClientController } from './get-client.controller';

describe('GetClientController', () => {
  let controller: GetClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetClientController],
    }).compile();

    controller = module.get<GetClientController>(GetClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
