import {Test, TestingModule} from '@nestjs/testing';
import {DeleteServiceService} from './delete-service.service';
import {SERVICE_TOKEN} from '../../SERVICE_TOKEN';

describe('DeleteServiceService', () => {
  let service: DeleteServiceService;
  let command;
  let useCaseMock;
  beforeEach(async () => {
    useCaseMock = {
      execute: jest.fn().mockResolvedValue(undefined),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteServiceService,
        {
          provide: SERVICE_TOKEN.USECASE.DELETE_SERVICE,
          useValue: useCaseMock,
        },
      ],
    }).compile();

    service = module.get<DeleteServiceService>(DeleteServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should execute the use case successfully', async () => {
    const result = await service.execute(command);

    expect(useCaseMock.execute).toHaveBeenCalled();
  });

  it('should throw error if use case throws', async () => {
    const errorSimulado = new Error('Database connection failed');
    useCaseMock.execute.mockRejectedValue(errorSimulado);
    await expect(service.execute(command)).rejects.toThrow(errorSimulado);
  });
});
