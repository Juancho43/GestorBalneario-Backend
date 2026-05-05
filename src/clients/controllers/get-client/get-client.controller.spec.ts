import {Test, TestingModule} from '@nestjs/testing';
import {GetClientController} from './get-client.controller';
import {GetClientService} from "../../services/get-client/get-client.service";
import {ClientMother} from "../../../../core-test/mothers/ClientMother";

describe('GetClientController', () => {
  let controller: GetClientController;
  let serviceMock;
  beforeEach(async () => {
    serviceMock ={
      execute:jest.fn().mockResolvedValue(ClientMother.create())
    }

      const module: TestingModule = await Test.createTestingModule({
      controllers: [GetClientController],
      providers: [
        {

          provide: GetClientService,
          useValue: serviceMock,
        }
      ]
    }).compile();

    controller = module.get<GetClientController>(GetClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(typeof controller.execute).toBe('function');
  });
  it('Should return a success response', async () => {
    const result = await controller.execute('123');
    expect(serviceMock.execute).toHaveBeenCalled();
    expect(result.statusCode).toBe(200);
    expect(result.message).toContain(' has been ');
  })


});
