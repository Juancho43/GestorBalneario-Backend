import {Test, TestingModule} from '@nestjs/testing';
import {DeleteClientService} from './delete-client.service';
import {CLIENT_TOKEN} from "../../CLIENT_TOKEN";

describe('DeleteClientService', () => {
  let service: DeleteClientService;
  let useCaseMock;
  let command;
  beforeEach(async () => {
    useCaseMock = {
      execute: jest.fn().mockResolvedValue(undefined),
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteClientService,
        {
          provide: CLIENT_TOKEN.USECASE.DELETE_CLIENT,
          useValue: useCaseMock,
        }],
    }).compile();

    service = module.get<DeleteClientService>(DeleteClientService);
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
