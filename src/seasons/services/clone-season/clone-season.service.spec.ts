import {Test, TestingModule} from '@nestjs/testing';
import {CloneSeasonService} from './clone-season.service';
import {SEASON_TOKEN} from "../../SEASON_TOKEN";

describe('CloneSeasonService', () => {
  let service: CloneSeasonService;
  let command;
  let useCaseMock;
  beforeEach(async () => {
    useCaseMock = {
      execute: jest.fn().mockResolvedValue({} as any),
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloneSeasonService,{
        provide: SEASON_TOKEN.USECASE.CLONE_SEASON,
        useValue: useCaseMock,
      }],
    }).compile();

    service = module.get<CloneSeasonService>(CloneSeasonService);
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
