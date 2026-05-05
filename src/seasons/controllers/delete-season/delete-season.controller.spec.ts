import {Test, TestingModule} from '@nestjs/testing';
import {DeleteSeasonController} from './delete-season.controller';
import {DeleteSeasonService} from "../../services/delete-season/delete-season.service";

describe('DeleteSeasonController', () => {
  let controller: DeleteSeasonController;
  let command;
  let serviceMock;
  beforeEach(async () => {
    serviceMock = {
      execute: jest.fn().mockResolvedValue(undefined)
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteSeasonController],
      providers: [
        {
          provide: DeleteSeasonService,
          useValue: serviceMock,
        }
      ]
    }).compile();

    controller = module.get<DeleteSeasonController>(DeleteSeasonController);
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
