import {Test, TestingModule} from '@nestjs/testing';
import {GetByIdShadowController} from './get-by-id-shadow.controller';
import {GetShadowService} from "../../services/get-shadow/get-shadow.service";
import {ShadowMother} from "../../../../core-test/mothers/ShadowMother";

describe('GetByIdShadowController', () => {
  let controller: GetByIdShadowController;
  let serviceMock;
  beforeEach(async () => {
    serviceMock ={
      execute:jest.fn().mockResolvedValue(ShadowMother.create())
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetByIdShadowController],
      providers: [
        {
          provide: GetShadowService,
          useValue: serviceMock,
        }
      ]
    }).compile();

    controller = module.get<GetByIdShadowController>(GetByIdShadowController);
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
