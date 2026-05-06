import {Test, TestingModule} from '@nestjs/testing';
import {DeleteSeasonService} from './delete-season.service';
import {SEASON_TOKEN} from '../../SEASON_TOKEN';

describe('DeleteSeasonService', () => {
  let service: DeleteSeasonService;
  let command;
  let useCaseMock;
  beforeEach(async () => {
    useCaseMock = {
      execute: jest.fn().mockResolvedValue(undefined),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteSeasonService,
        {
          provide: SEASON_TOKEN.USECASE.DELETE_SEASON,
          useValue: useCaseMock,
        },
      ],
    }).compile();

    service = module.get<DeleteSeasonService>(DeleteSeasonService);
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
