import {Test, TestingModule} from '@nestjs/testing';
import {CreateServiceController} from './create-service.controller';
import {CreateServiceCommand} from '../../../../core/Service/Application/Commands/CreateServiceCommand';
import {Season} from '../../../../core/Season/Model/Season';
import {GetActiveSeasonService} from '../../../seasons/services/get-active-season/get-active-season.service';
import {CurrentSeasonGuard} from '../../../guards/current-season.guard';
import {CreateServiceService} from '../../service/create-service/create-service.service';
import {ServiceMother} from "../../../../core-test/mothers/ServiceMother";

describe('CreateServiceController', () => {
  let controller: CreateServiceController;

  let getActiveMock;
  let serviceMock;
  let guardMock;
  let command: CreateServiceCommand;
  beforeEach(async () => {
    command = {
      name: 'hi',
      price: 10,
    };
    guardMock = {
      canActivate: jest.fn().mockResolvedValue(true),
    };
    serviceMock = {
      execute: jest.fn().mockResolvedValue(ServiceMother.create()),
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
          provide: CreateServiceService,
          useValue: serviceMock,
        },
        {
          provide: CurrentSeasonGuard,
          useValue: guardMock,
        },
      ],
      controllers: [CreateServiceController],
    }).compile();

    controller = module.get<CreateServiceController>(CreateServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create a service', async () => {
    const result = await controller.execute(command);
    expect(serviceMock.execute).toHaveBeenCalledWith(command);
    expect(result.statusCode).toBe(201);
    expect(result.message).toContain('has been created');
  });

});
