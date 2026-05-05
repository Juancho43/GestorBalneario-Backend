import {Test, TestingModule} from '@nestjs/testing';
import {EditClientController} from './edit-client.controller';
import {ClientMother} from "../../../../core-test/mothers/ClientMother";
import {EditClientService} from "../../services/edit-client/edit-client.service";

describe('EditClientController', () => {
  let controller: EditClientController;
  let mockService;
  let command;
  beforeEach(async () => {
    mockService = {
      execute: jest.fn().mockResolvedValue(ClientMother.create())
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EditClientController],
      providers: [
        {
          provide: EditClientService,
          useValue: mockService
        }
      ]
    }).compile();

    controller = module.get<EditClientController>(EditClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should execute', async () => {
    const result = await controller.execute(command);

    expect(mockService.execute).toHaveBeenCalledWith(command);
    expect(result.statusCode).toBe(201);
    expect(result.message).toContain(' has been ');
  });

});
