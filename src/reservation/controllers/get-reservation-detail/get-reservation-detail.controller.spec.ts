import {Test, TestingModule} from '@nestjs/testing';
import {GetReservationDetailController} from './get-reservation-detail.controller';
import {ReservationDetailResponse} from "../../../../core/Reservation/Application/DTO/ReservationDetailResponse";
import {GetReservationDetailService} from "../../services/get-reservation-detail/get-reservation-detail.service";

describe('GetReservationDetailController', () => {
  let controller: GetReservationDetailController;
  let serviceMock;
  beforeEach(async () => {
    serviceMock = {
      execute: jest.fn().mockResolvedValue({} as ReservationDetailResponse )
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetReservationDetailController],
      providers : [
        {
          provide: GetReservationDetailService,
          useValue: serviceMock
        }
      ]
    }).compile();

    controller = module.get<GetReservationDetailController>(
      GetReservationDetailController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should return a success response', async () => {
    const result = await controller.execute('id')
    expect(result.statusCode).toBe(200);
    expect(result.message).toContain(' has been ');
  })

});
