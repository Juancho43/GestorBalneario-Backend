import { Test, TestingModule } from '@nestjs/testing';
import { GetReservationDetailController } from './get-reservation-detail.controller';

describe('GetReservationDetailController', () => {
  let controller: GetReservationDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetReservationDetailController],
    }).compile();

    controller = module.get<GetReservationDetailController>(GetReservationDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
