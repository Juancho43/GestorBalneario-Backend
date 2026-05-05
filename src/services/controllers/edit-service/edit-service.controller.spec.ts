import {Test, TestingModule} from '@nestjs/testing';
import {EditServiceController} from './edit-service.controller';
import {ServiceMother} from "../../../../core-test/mothers/ServiceMother";
import {UpdateServiceService} from "../../service/update-service/update-service.service";
import {CurrentSeasonGuard} from "../../../guards/current-season.guard";
import {Season} from "../../../../core/Season/Model/Season";
import {GetActiveSeasonService} from "../../../seasons/services/get-active-season/get-active-season.service";

describe('EditServiceController', () => {
  let controller: EditServiceController;
  let command;
  let guardMock;
  let mockService;
  beforeEach(async () => {
   let getActiveMock = {
      get: jest.fn().mockResolvedValue({} as Season),
    };
    guardMock = {
      canActivate: jest.fn().mockResolvedValue(true),
    };
    mockService = {
      execute: jest.fn().mockResolvedValue(ServiceMother.create())
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EditServiceController],
      providers: [
        {
          provide: GetActiveSeasonService,
          useValue: getActiveMock,
        },
        {
        provide: UpdateServiceService,
        useValue: mockService,
      },{
          provide: CurrentSeasonGuard,
          useValue: guardMock,
      }],
    }).compile();

    controller = module.get<EditServiceController>(EditServiceController);
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
