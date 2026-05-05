import {Test, TestingModule} from '@nestjs/testing';
import {GetServiceController} from './get-service.controller';
import {ServiceMother} from "../../../../core-test/mothers/ServiceMother";
import {GetServiceService} from "../../service/get-service/get-service.service";

describe('GetServiceController', () => {
  let controller: GetServiceController;
  let serviceMock;
  beforeEach(async () => {
    serviceMock ={
      execute:jest.fn().mockResolvedValue(ServiceMother.create())
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetServiceController],

      providers: [
        {
          provide: GetServiceService,
          useValue: serviceMock,
        }
      ]
    }).compile();

    controller = module.get<GetServiceController>(GetServiceController);
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


});
