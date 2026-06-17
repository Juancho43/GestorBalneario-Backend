import { Test, TestingModule } from '@nestjs/testing';
import { GetServiceDetailsController } from './get-service-details.controller';

describe('GetServiceDetailsController', () => {
  let controller: GetServiceDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetServiceDetailsController],
    }).compile();

    controller = module.get<GetServiceDetailsController>(GetServiceDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
