import {Test, TestingModule} from '@nestjs/testing';
import {ReservationSearcherController} from './reservation-searcher.controller';

describe('ReservationSearcherController', () => {
  let controller: ReservationSearcherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationSearcherController],
    }).compile();

    controller = module.get<ReservationSearcherController>(ReservationSearcherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
