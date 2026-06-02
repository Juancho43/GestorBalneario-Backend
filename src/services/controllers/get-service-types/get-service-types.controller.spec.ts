import {Test, TestingModule} from '@nestjs/testing';
import {GetServiceTypesController} from './get-service-types.controller';

describe('GetServiceTypesController', () => {
  let controller: GetServiceTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetServiceTypesController],
    }).compile();

    controller = module.get<GetServiceTypesController>(GetServiceTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
