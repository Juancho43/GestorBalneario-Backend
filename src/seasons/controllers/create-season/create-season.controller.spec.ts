import {Test, TestingModule} from '@nestjs/testing';
import {CreateSeasonController} from './create-season.controller';
import {CreateSeasonService} from '../../services/create-season/create-season.service';
import {CreateSeasonCommand} from '../../../../core/Season/Application/Commads/CreateSeasonCommand';
import {Season} from '../../../../core/Season/Model/Season';

describe('CreateSeasonController', () => {
  let controller: CreateSeasonController;
  let serviceMock;
  let command: CreateSeasonCommand;
  beforeEach(async () => {
    command = {
      endDate: '2020-03-01',
      isActive: false,
      name: '2019-20',
      startDate: '2019-12-20',
    };
    serviceMock = {
      execute: jest.fn().mockResolvedValue({} as Season),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CreateSeasonService,
          useValue: serviceMock,
        },
      ],
      controllers: [CreateSeasonController],
    }).compile();

    controller = module.get<CreateSeasonController>(CreateSeasonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create a client', async () => {
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
