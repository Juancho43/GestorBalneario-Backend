import {Test, TestingModule} from '@nestjs/testing';
import {DeleteShadowService} from './delete-shadow.service';
import {SHADOW_TOKEN} from '../../SHADOW_TOKEN';

describe('DeleteShadowService', () => {
  let service: DeleteShadowService;
  let useCaseMock;
  let command;
  beforeEach(async () => {
    useCaseMock = {
      execute: jest.fn().mockResolvedValue(undefined),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteShadowService,
        {
          provide: SHADOW_TOKEN.USECASE.DELETE_SHADOW,
          useValue: useCaseMock,
        },
      ],
    }).compile();

    service = module.get<DeleteShadowService>(DeleteShadowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should call use case with correct command', async () => {
    await service.execute(command);
    expect(useCaseMock.execute).toHaveBeenCalledWith(command);
  });
  it('should throw error if use case throws', async () => {
    const errorSimulado = new Error('Database connection failed');
    useCaseMock.execute.mockRejectedValue(errorSimulado);
    await expect(service.execute(command)).rejects.toThrow(errorSimulado);
  });
});
