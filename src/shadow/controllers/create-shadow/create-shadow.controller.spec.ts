import {Test, TestingModule} from '@nestjs/testing';
import {CreateShadowController} from './create-shadow.controller';
import {CreateShadowService} from '../../services/create-shadow/create-shadow.service';
import {GetActiveSeasonService} from '../../../seasons/services/get-active-season/get-active-season.service';
import {Season} from '../../../../core/Season/Model/Season';
import {CreateShadowCommand} from '../../../../core/Shadow/Application/Command/CreateShadowCommand';
import {CurrentSeasonGuard} from '../../../guards/current-season.guard';
import {ShadowMother} from "../../../../core-test/mothers/ShadowMother";

describe('CreateShadowController', () => {
  let controller: CreateShadowController;
  let getActiveMock;
  let serviceMock;
  let guardMock;
  let command: CreateShadowCommand;
  beforeEach(async () => {
    command = {
      coords: { x: 10, y: 10 },
      identifier: 'c1',
      type: 'carpa',
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
      providers: [
        {
          provide: GetActiveSeasonService,
          useValue: getActiveMock,
        },
        {
          provide: CreateShadowService,
          useValue: serviceMock,
        },
        {
          provide: CurrentSeasonGuard,
          useValue: guardMock,
        },
      ],
      controllers: [CreateShadowController],
    }).compile();

    controller = module.get<CreateShadowController>(CreateShadowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(typeof controller.execute).toBe('function');
  });
  it('Should return a success response', async () => {
    const result = await controller.execute(command);
    expect(serviceMock.execute).toHaveBeenCalledWith(command);
    expect(result.statusCode).toBe(201);
    expect(result.message).toContain(' has been');
  });
  it('Should return an error response', async () => {
    const errorMock = new Error('Service error');
    serviceMock.execute.mockRejectedValue(errorMock);

    const result = await controller.execute(command);

    expect(result.statusCode).toBe(500);
  });
});
