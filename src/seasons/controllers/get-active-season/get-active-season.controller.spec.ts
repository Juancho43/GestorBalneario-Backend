import {Test, TestingModule} from '@nestjs/testing';
import {GetActiveSeasonController} from './get-active-season.controller';
import {SeasonResponse} from "../../../../core/Season/Application/DTO/SeasonResponse";
import {GetActiveSeasonService} from "../../services/get-active-season/get-active-season.service";

describe('GetActiveSeasonController', () => {
  let controller: GetActiveSeasonController;
  let serviceMock;

  beforeEach(async () => {
    serviceMock = {
      execute: jest.fn().mockResolvedValue({} as SeasonResponse)
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetActiveSeasonController],
      providers: [
        {
          provide: GetActiveSeasonService,
          useValue: serviceMock
        }
      ]
    }).compile();

    controller = module.get<GetActiveSeasonController>(
      GetActiveSeasonController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(typeof controller.execute).toBe('function');
  });
  it('Should return a success response', async () => {
    const result = await controller.execute();
    expect(serviceMock.execute).toHaveBeenCalled();
    expect(result.statusCode).toBe(200);
    expect(result.message).toContain(' has been ');
  })


});
