import {Test, TestingModule} from '@nestjs/testing';
import {ShadowHistoryController} from './shadow-history.controller';
import {GetShadowHistoryService} from "../../services/get-shadow-history/get-shadow-history.service";

describe('ShadowHistoryController', () => {
  let controller: ShadowHistoryController;
  let serviceMock;

  beforeEach(async () => {
    serviceMock = {
      execute: jest.fn(),
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShadowHistoryController],
        providers:[
          {
            provide: GetShadowHistoryService,
            useValue:serviceMock
          }
        ],
    }).compile();

    controller = module.get<ShadowHistoryController>(ShadowHistoryController);
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
