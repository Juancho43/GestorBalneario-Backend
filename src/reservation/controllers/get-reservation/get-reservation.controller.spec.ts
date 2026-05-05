import {Test, TestingModule} from '@nestjs/testing';
import {GetReservationController} from './get-reservation.controller';
import {ReservationMother} from "../../../../core-test/mothers/ReservationMother";
import {GetReservationService} from "../../services/get-reservation/get-reservation.service";

describe('GetReservationController', () => {
  let controller: GetReservationController;
  let serviceMock;
  beforeEach(async () => {
    serviceMock ={
      execute:jest.fn().mockResolvedValue(ReservationMother.create())
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetReservationController],
      providers: [
        {
          provide: GetReservationService,
          useValue: serviceMock,
        }
      ]
    }).compile();

    controller = module.get<GetReservationController>(GetReservationController);
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
