import {Test, TestingModule} from '@nestjs/testing';
import {GetSeasonController} from './get-season.controller';
import {GetSeasonService} from '../../services/get-season/get-season.service';
import {SeasonMother} from "../../../../core-test/mothers/SeasonMother";

describe('GetSeasonController', () => {
  let controller: GetSeasonController;
  let serviceMock;
  beforeEach(async () => {
    serviceMock ={
      execute:jest.fn().mockResolvedValue(SeasonMother.create())
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide:GetSeasonService,
          useValue: serviceMock,
        },
      ],
      controllers: [GetSeasonController],
    }).compile();

    controller = module.get<GetSeasonController>(GetSeasonController);
  });


  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(typeof controller.execute).toBe('function');
  });
  it('Should return a success response', async () => {
    const result = await controller.execute('');
    expect(serviceMock.execute).toHaveBeenCalled();
    expect(result.statusCode).toBe(200);
    expect(result.message).toContain(' has been ');
  })
  it('Should return an error response', async () => {
    const errorMock = new Error('Service error');
    serviceMock.execute.mockRejectedValue(errorMock);
    const result = await controller.execute('');
    expect(result.statusCode).toBe(500);
  })

});
