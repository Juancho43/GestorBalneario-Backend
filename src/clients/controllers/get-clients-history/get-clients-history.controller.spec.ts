import {Test, TestingModule} from '@nestjs/testing';
import {GetClientsHistoryController} from './get-clients-history.controller';
import {GetClientsHistoryService} from "../../services/get-clients-history/get-clients-history.service";
import {ClientMother} from "../../../../core-test/mothers/ClientMother";
import {Client} from "../../../../core/Client/Model/Client";

describe('GetClientsHistoryController', () => {
  let controller: GetClientsHistoryController;
  let serviceMock;
  beforeEach(async () => {
    let data: Client[]  = []
    for(let i = 0; i>5; i++){
      data.push(ClientMother.create())
    }
    serviceMock = {
      execute: jest.fn().mockResolvedValue(data),
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetClientsHistoryController],
      providers: [
        {
          provide: GetClientsHistoryService,
          useValue:serviceMock,
        }
      ]
    }).compile();

    controller = module.get<GetClientsHistoryController>(
      GetClientsHistoryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should return a success response', async () => {
    const result = await controller.execute(0,10);
    expect(serviceMock.execute).toHaveBeenCalled();
    expect(result.statusCode).toBe(200);
    expect(result.message).toContain(' have been ');
  })
});
