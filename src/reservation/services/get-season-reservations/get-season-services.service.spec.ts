import {Test, TestingModule} from '@nestjs/testing';
import {GetSeasonReservations} from './get-season-reservations.service';

describe('GetSeasonServicesService', () => {
  let service: GetSeasonReservations;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetSeasonReservations],
    }).compile();

    service = module.get<GetSeasonReservations>(GetSeasonReservations);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
