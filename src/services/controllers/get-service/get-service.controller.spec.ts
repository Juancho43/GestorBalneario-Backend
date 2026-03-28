import { Test, TestingModule } from '@nestjs/testing';
import { GetServiceController } from './get-service.controller';

describe('GetServiceController', () => {
  let controller: GetServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetServiceController],
    }).compile();

    controller = module.get<GetServiceController>(GetServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
