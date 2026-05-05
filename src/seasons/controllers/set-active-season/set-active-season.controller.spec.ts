import {Test, TestingModule} from '@nestjs/testing';
import {SetActiveSeasonController} from './set-active-season.controller';
import {SetActiveSeasonService} from "../../services/set-active-season/set-active-season.service";

describe('SetActiveSeasonController', () => {
  let controller: SetActiveSeasonController;
  let serviceMock;
  let command;
  beforeEach(async () => {
  serviceMock = {
    execute: jest.fn().mockResolvedValue(undefined),
  }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SetActiveSeasonController],
      providers: [
        {
          provide: SetActiveSeasonService,
          useValue: serviceMock,
        }
      ]
    }).compile();

    controller = module.get<SetActiveSeasonController>(
      SetActiveSeasonController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should execute', async () => {
    const result = await controller.execute(command);

    expect(serviceMock.execute).toHaveBeenCalledWith(command);
    expect(result.statusCode).toBe(200);
    expect(result.message).toContain('has been set to active');
  });
});
