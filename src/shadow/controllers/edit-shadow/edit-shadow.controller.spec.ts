import {Test, TestingModule} from '@nestjs/testing';
import {EditShadowController} from './edit-shadow.controller';
import {ShadowMother} from "../../../../core-test/mothers/ShadowMother";
import {Season} from "../../../../core/Season/Model/Season";
import {UpdateShadowCommand} from "../../../../core/Shadow/Application/Command/UpdateShadowCommand";
import {GetActiveSeasonService} from "../../../seasons/services/get-active-season/get-active-season.service";
import {CurrentSeasonGuard} from "../../../guards/current-season.guard";
import {EditShadowService} from "../../services/edit-shadow/edit-shadow.service";

describe('EditShadowController', () => {
  let controller: EditShadowController;
  let getActiveMock;
  let serviceMock;
  let guardMock;
  let command: UpdateShadowCommand;
  beforeEach(async () => {
    command = {
      id:'q',
      data :{

      coords: { x: 10, y: 10 },
      identifier: 'c1',
      type: 'carpa',
      }
    };
    guardMock = {
      canActivate: jest.fn().mockResolvedValue(true),
    };
    serviceMock = {
      execute: jest.fn().mockResolvedValue(ShadowMother.create()),
    };
    getActiveMock = {
      get: jest.fn().mockResolvedValue({} as Season),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EditShadowController],
      providers: [
        {
          provide: GetActiveSeasonService,
          useValue: getActiveMock,
        },
        {
          provide: EditShadowService,
          useValue: serviceMock,
        },
        {
          provide: CurrentSeasonGuard,
          useValue: guardMock,
        },
      ],
    }).compile();

    controller = module.get<EditShadowController>(EditShadowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(typeof controller.execute).toBe('function');
  });

  it('Should return a success response', async () => {
    const result = await controller.execute(command);
    expect(serviceMock.execute).toHaveBeenCalledWith(command);
    expect(result.statusCode).toBe(200);
    expect(result.message).toContain(' has been ');
  });
  it('Should return an error response', async () => {
    const errorMock = new Error('Service error');
    serviceMock.execute.mockRejectedValue(errorMock);

    const result = await controller.execute(command);

    expect(result.statusCode).toBe(500);
  });
});
