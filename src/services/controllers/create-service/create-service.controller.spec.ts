import { Test, TestingModule } from '@nestjs/testing';
import { CreateServiceController } from './create-service.controller';

describe('CreateServiceController', () => {
  let controller: CreateServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateServiceController],
    }).compile();

    controller = module.get<CreateServiceController>(CreateServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
