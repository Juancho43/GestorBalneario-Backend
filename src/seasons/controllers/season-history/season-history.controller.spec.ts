import {Test, TestingModule} from '@nestjs/testing';
import {SeasonHistoryController} from './season-history.controller';
import {Season} from "../../../../core/Season/Model/Season";
import {SeasonMother} from "../../../../core-test/mothers/SeasonMother";
import {GetSeasonsHistoryService} from "../../services/get-seasons-history/get-seasons-history.service";

describe('SeasonHistoryController', () => {
  let controller: SeasonHistoryController;
  let serviceMock;

  beforeEach(async () => {
    let data : Season[] = []
    for(let i = 0; i < 5; i++){
      data.push(SeasonMother.create())
    }
    serviceMock = {
      execute: jest.fn().mockResolvedValue(data),
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeasonHistoryController],
      providers: [
        {
          provide: GetSeasonsHistoryService,
          useValue:serviceMock
        }
      ]
    }).compile();

    controller = module.get<SeasonHistoryController>(SeasonHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  it('Should return a success response', async () => {
    const result = await controller.execute(0,10);
    expect(serviceMock.execute).toHaveBeenCalled();
    expect(result.statusCode).toBe(200);
    expect(result.message).toContain(' has been ');
  })
});
