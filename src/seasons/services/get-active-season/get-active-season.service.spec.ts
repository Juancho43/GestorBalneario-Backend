import {Test, TestingModule} from '@nestjs/testing';
import {GetActiveSeasonService} from './get-active-season.service';
import {SEASON_TOKEN} from "../../SEASON_TOKEN";

describe('GetActiveSeasonService', () => {
  let service: GetActiveSeasonService;
  let useCaseMock;
  beforeEach(async () => {
    useCaseMock = {
      execute: jest.fn().mockResolvedValue({} as any),
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetActiveSeasonService,{
        provide:SEASON_TOKEN.USECASE.CURRENT_SEASON,
        useValue: useCaseMock,
      }],
    }).compile();

    service = module.get<GetActiveSeasonService>(GetActiveSeasonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should execute the use case successfully', async () => {
    const result = await service.execute();

    expect(result).toBeDefined();
    expect(useCaseMock.execute).toHaveBeenCalled();
  });

  it('should log an error and re-throw if the use case fails', async () => {
    const errorSimulado = new Error('Database connection failed');
    useCaseMock.execute.mockRejectedValue(errorSimulado);
    await expect(service.execute()).rejects.toThrow(errorSimulado);
  });
});
