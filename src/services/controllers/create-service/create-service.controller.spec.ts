import {Test, TestingModule} from '@nestjs/testing';
import {CreateServiceController} from './create-service.controller';
import {CreateServiceCommand} from '../../../../core/Service/Application/Commands/CreateServiceCommand';
import {Season} from '../../../../core/Season/Model/Season';
import {Service} from '../../../../core/Service/Model/Service';
import {GetActiveSeasonService} from '../../../seasons/services/get-active-season/get-active-season.service';
import {CurrentSeasonGuard} from '../../../guards/current-season.guard';
import {CreateServiceService} from '../../service/create-service/create-service.service';

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
      execute: jest.fn().mockResolvedValue({} as Service),
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
  it('should return error response if service throws', async () => {
    const errorMock = new Error('Service error');
    serviceMock.execute.mockRejectedValue(errorMock);

    const result = await controller.execute(command);

    expect(result.statusCode).toBe(500);
  });
});
