import {Test, TestingModule} from '@nestjs/testing';
import {CreateShadowService} from './create-shadow.service';
import {CreateShadowCommand} from '../../../../core/Shadow/Application/Command/CreateShadowCommand';
import {Shadow} from '../../../../core/Shadow/Model/Shadow';
import {SHADOW_TOKEN} from '../../SHADOW_TOKEN';

describe('CreateShadowService', () => {
  let service;
  let useCaseMock;
  let command: CreateShadowCommand;
  beforeEach(async () => {
    command = {
      coords: { x: 10, y: 10 },
      identifier: 'c1',
      type: 'carpa',
    };

    useCaseMock = {
      execute: jest.fn().mockReturnValue({} as Shadow),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateShadowService,
        {
          provide: SHADOW_TOKEN.USECASE.CREATE_SHADOW,
          useValue: useCaseMock,
        },
      ],
    }).compile();

    service = module.get<CreateShadowService>(CreateShadowService);
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
