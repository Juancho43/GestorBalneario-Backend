import { Test, TestingModule } from '@nestjs/testing';
import { EditServiceController } from './edit-service.controller';

describe('EditServiceController', () => {
  let controller: EditServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EditServiceController],
    }).compile();

    controller = module.get<EditServiceController>(EditServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
