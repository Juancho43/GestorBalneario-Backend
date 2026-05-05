import {Test, TestingModule} from '@nestjs/testing';
import {CreateClientController} from './create-client.controller';
import {CreateClientService} from '../../services/create-client/create-client.service';
import {CreateClientCommand} from '../../../../core/Client/Application/Commands/CreateClientCommand';
import {ClientMother} from "../../../../core-test/mothers/ClientMother";

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
      execute: jest.fn().mockResolvedValue(ClientMother.create()),
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
  it('should execute', async () => {
    const result = await controller.execute(command);

    expect(serviceMock.execute).toHaveBeenCalledWith(command);
    expect(result.statusCode).toBe(201);
    expect(result.message).toContain(' has been ');
  });
  it('should throw an error if service throws', async () => {
    const errorMock = new Error('Service error');
    serviceMock.execute.mockRejectedValue(errorMock);

    await expect(controller.execute(command)).rejects.toThrow(errorMock);
  });
});
