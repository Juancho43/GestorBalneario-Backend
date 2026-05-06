import {Test, TestingModule} from '@nestjs/testing';
import {UpdateServiceService} from './update-service.service';
import {Service} from '../../../../core/Service/Model/Service';
import {SERVICE_TOKEN} from '../../SERVICE_TOKEN';

describe('UpdateServiceService', () => {
  let service: UpdateServiceService;
  let useCaseMock;
  let command;
  beforeEach(async () => {
    useCaseMock = {
      execute: jest.fn().mockResolvedValue({} as Service),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateServiceService,
        {
          provide: SERVICE_TOKEN.USECASE.UPDATE_SERVICE,
          useValue: useCaseMock,
        },
      ],
    }).compile();

    service = module.get<UpdateServiceService>(UpdateServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should execute the use case successfully', async () => {
    const result = await service.execute(command);

    expect(result).toBeDefined();
    expect(useCaseMock.execute).toHaveBeenCalled();
  });

  it('should log an error and re-throw if the use case fails', async () => {
    const errorSimulado = new Error('Database connection failed');
    useCaseMock.execute.mockRejectedValue(errorSimulado);
    await expect(service.execute(command)).rejects.toThrow(errorSimulado);
  });
});
