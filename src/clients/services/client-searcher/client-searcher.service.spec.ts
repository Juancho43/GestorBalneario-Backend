import {Test, TestingModule} from '@nestjs/testing';
import {ClientSearcherService} from './client-searcher.service';
import {CLIENT_TOKEN} from "../../CLIENT_TOKEN";

describe('ClientSearcherService', () => {
  let service: ClientSearcherService;
  let command;
  let useCaseMock;
  beforeEach(async () => {
    useCaseMock = {
      execute: jest.fn().mockResolvedValue({} as any),
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientSearcherService,{
        provide:CLIENT_TOKEN.USECASE.SEARCHER,
        useValue: useCaseMock,
      }],
    }).compile();

    service = module.get<ClientSearcherService>(ClientSearcherService);
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
