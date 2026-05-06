import {Test, TestingModule} from '@nestjs/testing';
import {GetShadowService} from './get-shadow.service';
import {Shadow} from '../../../../core/Shadow/Model/Shadow';
import {SHADOW_TOKEN} from '../../SHADOW_TOKEN';

describe('GetShadowService', () => {
  let service: GetShadowService;
  let useCaseMock;
  let command;
  beforeEach(async () => {
    useCaseMock = {
      execute: jest.fn().mockResolvedValue({} as Shadow),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetShadowService,
        {
          provide: SHADOW_TOKEN.USECASE.GET_SHADOW,
          useValue: useCaseMock,
        },
      ],
    }).compile();

    service = module.get<GetShadowService>(GetShadowService);
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
