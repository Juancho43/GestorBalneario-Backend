import {Test, TestingModule} from '@nestjs/testing';
import {GetShadowMapController} from './get-shadow-map.controller';
import {GetShadowMapService} from "../../services/get-shadow-map/get-shadow-map.service";

describe('GetShadowMapController', () => {
  let controller: GetShadowMapController;
let serviceMock;
  beforeEach(async () => {
    serviceMock ={
      execute:jest.fn()
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetShadowMapController],
      providers:[
        {
          provide: GetShadowMapService,
          useValue: serviceMock
        }
      ]
    }).compile();

    controller = module.get<GetShadowMapController>(GetShadowMapController);
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
