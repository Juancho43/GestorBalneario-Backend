import {Test, TestingModule} from '@nestjs/testing';
import {DeleteServiceController} from './delete-service.controller';
import {DeleteServiceService} from "../../service/delete-service/delete-service.service";

describe('DeleteServiceController', () => {
  let controller: DeleteServiceController;
  let command;
  let serviceMock;
  beforeEach(async () => {
    serviceMock = {
      execute: jest.fn().mockResolvedValue(undefined),
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteServiceController],
      providers: [
        {
          provide: DeleteServiceService,
          useValue: serviceMock,
        }
      ]
    }).compile();

    controller = module.get<DeleteServiceController>(DeleteServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should excute', async () => {
    const result = await controller.execute(command);

    expect(result.statusCode).toBe(204);
    expect(result.message).toContain('been ');
  });
});
