import {Test, TestingModule} from '@nestjs/testing';
import {EditReservationController} from './edit-reservation.controller';
import {ReservationMother} from "../../../../core-test/mothers/ReservationMother";
import {EditReservationService} from "../../services/edit-reservation/edit-reservation.service";

describe('EditReservationController', () => {
  let controller: EditReservationController;
  let command;
  let serviceMock;
  beforeEach(async () => {
    serviceMock = {
      execute: jest.fn().mockResolvedValue(ReservationMother.create())
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EditReservationController],
      providers: [
        {
          provide: EditReservationService,
          useValue: serviceMock
        }
      ]

    }).compile();

    controller = module.get<EditReservationController>(
      EditReservationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should execute', async () => {
    const result = await controller.execute(command);

    expect(serviceMock.execute).toHaveBeenCalledWith(command);
    expect(result.statusCode).toBe(201);
    expect(result.message).toContain(' has been ');
  });
});

