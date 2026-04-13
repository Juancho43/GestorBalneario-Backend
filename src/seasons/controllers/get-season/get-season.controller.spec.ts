import { Test, TestingModule } from '@nestjs/testing';
import { GetSeasonController } from './get-season.controller';
import {GetSeasonService} from "../../services/get-season/get-season.service";

describe('GetSeasonController', () => {
  let controller: GetSeasonController;
  let dao;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetSeasonService,
        {
          provide:'GET_SEASON',
          useValue:dao
        }
      ],
      controllers: [GetSeasonController],
    }).compile();

    controller = module.get<GetSeasonController>(GetSeasonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
