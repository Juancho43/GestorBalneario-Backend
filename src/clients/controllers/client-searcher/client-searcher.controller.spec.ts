import {Test, TestingModule} from '@nestjs/testing';
import {ClientSearcherController} from './client-searcher.controller';
import {ClientSearcherService} from "../../services/client-searcher/client-searcher.service";
import {ClientResponse} from "../../../../core/Client/Application/DTO/ClientResponse";

describe('ClientSearcherController', () => {
  let controller: ClientSearcherController;
  let serviceMock;

  let id = 'mockid';
  let page = 0;
  let pageSize = 10;
  beforeEach(async () => {
    serviceMock = {
      execute: jest.fn().mockResolvedValue({} as ClientResponse[])
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientSearcherController],
      providers: [
        {
          provide: ClientSearcherService,
          useValue: serviceMock
        }
      ]
    }).compile();

    controller = module.get<ClientSearcherController>(ClientSearcherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should excute', async () => {
    const result = await controller.execute(id,page,pageSize);

    expect(result.statusCode).toBe(200);
    expect(result.message).toContain('been ');
  });
  it('should throw an error if service throws', async () => {
    const errorMock = new Error('Service error');
    serviceMock.execute.mockRejectedValue(errorMock);

    await expect(controller.execute(id,page,pageSize)).rejects.toThrow(errorMock);
  });
});
