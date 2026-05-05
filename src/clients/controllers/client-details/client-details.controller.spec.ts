import {Test, TestingModule} from '@nestjs/testing';
import {ClientDetailsController} from './client-details.controller';

describe('ClientDetailsController', () => {
  let controller: ClientDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientDetailsController],
    }).compile();

    controller = module.get<ClientDetailsController>(ClientDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
