import {Test, TestingModule} from '@nestjs/testing';
import {CreateReservationController} from './create-reservation.controller';
import {GetActiveSeasonService} from '../../../seasons/services/get-active-season/get-active-season.service';
import {CurrentSeasonGuard} from '../../../guards/current-season.guard';
import {CreateReservationCommand} from '../../../../core/Reservation/Application/Commands/CreateReservationCommand';
import {CreateReservationService} from '../../services/create-reservation/create-reservation.service';
import {Season} from '../../../../core/Season/Model/Season';
import {Reservation} from '../../../../core/Reservation/Model/Reservation';

describe('CreateReservationController', () => {
  let controller: CreateReservationController;
  let getActiveMock;
  let serviceMock;
  let guardMock;
  let command: CreateReservationCommand;
  beforeEach(async () => {
    command = {
      checkIn: '',
      checkOut: '',
      clientId: '',
      price: 0,
      serviceId: '',
      shadowId: '',
    };
    guardMock = {
      canActivate: jest.fn().mockResolvedValue(true),
    };
    serviceMock = {
      execute: jest.fn().mockResolvedValue({} as Reservation),
    };
    getActiveMock = {
      get: jest.fn().mockResolvedValue({} as Season),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: GetActiveSeasonService,
          useValue: getActiveMock,
        },
        {
          provide: CreateReservationService,
          useValue: serviceMock,
        },
        {
          provide: CurrentSeasonGuard,
          useValue: guardMock,
        },
      ],
      controllers: [CreateReservationController],
    }).compile();

    controller = module.get<CreateReservationController>(
      CreateReservationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create a shadow', async () => {
    // Act
    const result = await controller.execute(command);

    // Assert (Validación del éxito)
    expect(serviceMock.execute).toHaveBeenCalledWith(command);
    expect(result.statusCode).toBe(201); // El éxito que definiste en tu controlador
    expect(result.message).toContain('has been created');
  });
  it('should return error response if service throws', async () => {
    // 1. Forzamos el fallo
    const errorMock = new Error('Service error');
    serviceMock.execute.mockRejectedValue(errorMock);

    // 2. Ejecutamos
    const result = await controller.execute(command);

    // 3. Validamos la respuesta del catch (ajusta según tu CreateAppResponse)
    expect(result.statusCode).toBe(500);
    // Si tu errorResponse incluye el error original, puedes validarlo:
    // expect(result.error).toBeDefined();
  });
});
