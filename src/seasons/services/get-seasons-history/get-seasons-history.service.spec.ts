import {Test, TestingModule} from '@nestjs/testing';
import {GetSeasonsHistoryService} from './get-seasons-history.service';
import {SEASON_TOKEN} from "../../SEASON_TOKEN";

describe('GetSeasonsHistoryService', () => {
  let service: GetSeasonsHistoryService;
  let command;
  let useCaseMock;
  beforeEach(async () => {
    useCaseMock = {
      execute: jest.fn().mockResolvedValue({} as any),
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetSeasonsHistoryService,{
        provide:SEASON_TOKEN.USECASE.GET_HISTORY,
        useValue: useCaseMock,
      }],
    }).compile();

    service = module.get<GetSeasonsHistoryService>(GetSeasonsHistoryService);
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
