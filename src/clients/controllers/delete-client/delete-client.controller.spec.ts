import { Test, TestingModule } from '@nestjs/testing';
import { DeleteClientController } from './delete-client.controller';

describe('DeleteClientController', () => {
  let controller: DeleteClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteClientController],
    }).compile();

    controller = module.get<DeleteClientController>(DeleteClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
