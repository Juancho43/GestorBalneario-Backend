import {Test, TestingModule} from '@nestjs/testing';
import {GetActiveReservationsController} from './get-active-reservations.controller';
import {GetActiveReservationsService} from "../../services/get-active-reservations/get-active-reservations.service";
import {Reservation} from "../../../../core/Reservation/Model/Reservation";
import {ReservationMother} from "../../../../core-test/mothers/ReservationMother";

describe('GetActiveReservationsController', () => {
  let controller: GetActiveReservationsController;
  let serviceMock;

  beforeEach(async () => {
    let data :Reservation[] = []
    for(let i = 0; i < 5; i++){
      data.push(ReservationMother.create())
    }
    serviceMock = {
      execute: jest.fn().mockResolvedValue(data),
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetActiveReservationsController],
      providers:[
        {
          provide: GetActiveReservationsService,
          useValue: serviceMock
        }
      ]
    }).compile();

    controller = module.get<GetActiveReservationsController>(
      GetActiveReservationsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should return a success response', async () => {
    const result = await controller.execute()
    expect(result.statusCode).toBe(200);
    expect(result.message).toContain(' has been ');
  })
});
