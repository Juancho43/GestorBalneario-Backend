import { Test, TestingModule } from '@nestjs/testing';
import { GetSeasonServicesController } from './get-season-services.controller';

describe('GetSeasonServicesController', () => {
  let controller: GetSeasonServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetSeasonServicesController],
    }).compile();

    controller = module.get<GetSeasonServicesController>(
      GetSeasonServicesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
