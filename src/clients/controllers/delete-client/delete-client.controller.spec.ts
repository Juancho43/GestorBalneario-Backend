import {Test, TestingModule} from '@nestjs/testing';
import {DeleteClientController} from './delete-client.controller';
import {DeleteClientService} from "../../services/delete-client/delete-client.service";

describe('DeleteClientController', () => {
  let controller: DeleteClientController;
  let serviceMock;
  let command;
  beforeEach(async () => {
    serviceMock = {
      execute: jest.fn().mockResolvedValue(undefined)
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteClientController],
      providers: [
        {
          provide: DeleteClientService,
          useValue: serviceMock
        }
      ]
    }).compile();

    controller = module.get<DeleteClientController>(DeleteClientController);
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
