import {Test, TestingModule} from '@nestjs/testing';
import {ClientDetailsController} from './client-details.controller';
import {ClientDetailsDTO} from "../../../../core/Client/Application/DTO/ClientDetailsDTO";
import {ClientDetailsService} from "../../services/client-details/client-details.service";

describe('ClientDetailsController', () => {
  let controller: ClientDetailsController;
  let serviceMock;
  let id = 'mockid';
  let page = 0;
  let pageSize = 10;
  beforeEach(async () => {

    serviceMock = {
      execute: jest.fn().mockResolvedValue({} as ClientDetailsDTO),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientDetailsController],
      providers: [
        {
          provide: ClientDetailsService,
          useValue: serviceMock,
        }
      ]
    }).compile();

    controller = module.get<ClientDetailsController>(ClientDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should excute', async () => {
    const result = await controller.execute(id,page,pageSize);

    expect(result.statusCode).toBe(200);
    expect(result.message).toContain('been ');
  });

});
