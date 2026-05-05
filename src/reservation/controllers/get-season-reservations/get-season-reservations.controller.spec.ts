import {Test, TestingModule} from '@nestjs/testing';
import {GetSeasonReservationsController} from './get-season-reservations.controller';

describe('GetSeasonReservationsController', () => {
  let controller: GetSeasonReservationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetSeasonReservationsController],
    }).compile();

    controller = module.get<GetSeasonReservationsController>(
      GetSeasonReservationsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
