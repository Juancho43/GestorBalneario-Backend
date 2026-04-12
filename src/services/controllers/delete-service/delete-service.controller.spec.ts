import { Test, TestingModule } from '@nestjs/testing';
import { DeleteServiceController } from './delete-service.controller';

describe('DeleteServiceController', () => {
  let controller: DeleteServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteServiceController],
    }).compile();

    controller = module.get<DeleteServiceController>(DeleteServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
