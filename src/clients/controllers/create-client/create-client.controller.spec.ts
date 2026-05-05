import {Test, TestingModule} from '@nestjs/testing';
import {CreateClientController} from './create-client.controller';
import {CreateClientService} from '../../services/create-client/create-client.service';
import {CreateClientCommand} from '../../../../core/Client/Application/Commands/CreateClientCommand';
import {ClientResponse} from '../../../../core/Client/Application/DTO/ClientResponse';

describe('CreateClientController', () => {
  let controller: CreateClientController;
  let serviceMock;
  let command: CreateClientCommand;
  beforeEach(async () => {
    command = {
      email: 'prueba@prueba.com',
      name: 'prueba',
      phone: '1234',
    };
    serviceMock = {
      execute: jest.fn().mockResolvedValue({ name: 'juan' } as ClientResponse),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CreateClientService,
          useValue: serviceMock,
        },
      ],
      controllers: [CreateClientController],
    }).compile();

    controller = module.get<CreateClientController>(CreateClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create a client', async () => {
    const result = await controller.execute(command);

    expect(serviceMock.execute).toHaveBeenCalledWith(command);
    expect(result.statusCode).toBe(201);
    expect(result.message).toContain('client has been created');
  });
  it('should return error response if service throws', async () => {
    const errorMock = new Error('Service error');
    serviceMock.execute.mockRejectedValue(errorMock);
    const result = await controller.execute(command);
    expect(result.statusCode).toBe(500);
  });
});
