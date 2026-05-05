import {Test, TestingModule} from '@nestjs/testing';
import {EditSeasonController} from './edit-season.controller';
import {SeasonMother} from "../../../../core-test/mothers/SeasonMother";
import {UpdateSeasonService} from "../../services/update-season/update-season.service";

describe('EditSeasonController', () => {
  let controller: EditSeasonController;
  let command;
  let mockService;
  beforeEach(async () => {
    mockService = {
      execute: jest.fn(). mockResolvedValue(SeasonMother.create())
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EditSeasonController],
      providers: [
        {
          provide:UpdateSeasonService,
          useValue: mockService
        }
      ]
    }).compile();

    controller = module.get<EditSeasonController>(EditSeasonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should execute', async () => {
    const result = await controller.execute(command);

    expect(mockService.execute).toHaveBeenCalledWith(command);
    expect(result.statusCode).toBe(200);
    expect(result.message).toContain(' has been ');
  });
});
