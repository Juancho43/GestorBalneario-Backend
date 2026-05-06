import {Test, TestingModule} from '@nestjs/testing';
import {EditClientService} from './edit-client.service';
import {Client} from "../../../../core/Client/Model/Client";
import {CLIENT_TOKEN} from "../../CLIENT_TOKEN";

describe('EditClientService', () => {
  let service: EditClientService;
  let command;
  let useCaseMock;
  beforeEach(async () => {
    useCaseMock = {
      execute: jest.fn().mockResolvedValue({} as Client),
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [EditClientService,{
        provide: CLIENT_TOKEN.USECASE.UPDATE_CLIENT,
        useValue: useCaseMock,
      }],
    }).compile();

    service = module.get<EditClientService>(EditClientService);
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
