import {Test, TestingModule} from '@nestjs/testing';
import {GetSeasonServicesController} from './get-season-services.controller';
import {SeasonServiceDTO} from "../../../../core/Service/Application/DTO/SeasonServiceDTO";
import {GetSeasonServicesService} from "../../service/get-season-services/get-season-services.service";

describe('GetSeasonServicesController', () => {
  let controller: GetSeasonServicesController;
  let serviceMock;

  beforeEach(async () => {
    serviceMock = {
      execute: jest.fn().mockResolvedValue({} as SeasonServiceDTO),
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetSeasonServicesController],
      providers: [
        {
          provide: GetSeasonServicesService,
          useValue: serviceMock,
        }
      ]
    }).compile();

    controller = module.get<GetSeasonServicesController>(
      GetSeasonServicesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should return a success response', async () => {
    const result = await controller.execute('');
    expect(serviceMock.execute).toHaveBeenCalled();
    expect(result.statusCode).toBe(200);
    expect(result.message).toContain(' has been ');
  })

});
