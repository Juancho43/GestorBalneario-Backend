import {Test, TestingModule} from '@nestjs/testing';
import {GetShadowMapService} from './get-shadow-map.service';
import {SHADOW_TOKEN} from "../../SHADOW_TOKEN";
import {GetActiveSeasonService} from "../../../seasons/services/get-active-season/get-active-season.service";

describe('GetShadowMapService', () => {
  let service: GetShadowMapService;
  let useCaseMock;
  let command;
  beforeEach(async () => {
    useCaseMock = {
      execute: jest.fn().mockResolvedValue({} as any)
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetShadowMapService,
        {
          provide: GetActiveSeasonService,
          useValue: {
            get: jest.fn().mockResolvedValue({ id: { value: '123' } })
          },
        },
        {
          provide:SHADOW_TOKEN.USECASE.GET_SHADOW_MAP,
          useValue: useCaseMock,
        }
      ],
    }).compile();

    service = module.get<GetShadowMapService>(GetShadowMapService);
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
