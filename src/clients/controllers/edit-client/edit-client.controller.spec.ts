import { Test, TestingModule } from '@nestjs/testing';
import { EditClientController } from './edit-client.controller';

describe('EditClientController', () => {
  let controller: EditClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EditClientController],
    }).compile();

    controller = module.get<EditClientController>(EditClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
