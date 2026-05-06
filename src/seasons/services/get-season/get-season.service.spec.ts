import {Test, TestingModule} from '@nestjs/testing';
import {GetSeasonService} from './get-season.service';
import {Season} from '../../../../core/Season/Model/Season';
import {SEASON_TOKEN} from '../../SEASON_TOKEN';

describe('GetSeasonService', () => {
  let service: GetSeasonService;
  let useCaseMock;
  let command;
  beforeEach(async () => {
    useCaseMock = {
      execute: jest.fn().mockResolvedValue({} as Season),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetSeasonService,
        {
          provide: SEASON_TOKEN.USECASE.GET_SEASON,
          useValue: useCaseMock,
        },
      ],
    }).compile();

    service = module.get<GetSeasonService>(GetSeasonService);
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
