import { Test, TestingModule } from '@nestjs/testing';
import { GetsServicesController } from './gets-services.controller';

describe('GetsServicesController', () => {
  let controller: GetsServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetsServicesController],
    }).compile();

    controller = module.get<GetsServicesController>(GetsServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
