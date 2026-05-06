import {Test, TestingModule} from '@nestjs/testing';
import {CreateServiceService} from './create-service.service';
import {CreateServiceCommand} from '../../../../core/Service/Application/Commands/CreateServiceCommand';
import {Service} from '../../../../core/Service/Model/Service';
import {SERVICE_TOKEN} from '../../SERVICE_TOKEN';

describe('CreateServiceService', () => {
  let service;
  let useCaseMock;
  let command: CreateServiceCommand;
  beforeEach(async () => {
    command = {
      name: 'booking',
      price: 2,
    };

    useCaseMock = {
      execute: jest.fn().mockResolvedValue({} as Service),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateServiceService,
        {
          provide: SERVICE_TOKEN.USECASE.CREATE_SERVICE,
          useValue: useCaseMock,
        },
      ],
    }).compile();

    service = module.get<CreateServiceService>(CreateServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should execute the use case successfully and return a ShadowResponse', async () => {
    const result = await service.execute(command);

    expect(result).toBeDefined();
    expect(useCaseMock.execute).toHaveBeenCalledWith(command);
  });

  it('should log an error and re-throw if the use case fails', async () => {
    const errorSimulado = new Error('Database connection failed');
    useCaseMock.execute.mockRejectedValue(errorSimulado);
    await expect(service.execute(command)).rejects.toThrow(errorSimulado);
  });
});
