import {Test, TestingModule} from '@nestjs/testing';
import {GetSeasonReservationsService} from './get-season-reservations.service';

describe('GetSeasonServicesService', () => {
  let service: GetSeasonReservationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetSeasonReservationsService],
    }).compile();

    service = module.get<GetSeasonReservationsService>(GetSeasonReservationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
