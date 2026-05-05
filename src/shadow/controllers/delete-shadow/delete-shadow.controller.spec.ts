import {Test, TestingModule} from '@nestjs/testing';
import {DeleteShadowController} from './delete-shadow.controller';
import {DeleteShadowService} from "../../services/delete-shadow/delete-shadow.service";

describe('DeleteShadowController', () => {
  let controller: DeleteShadowController;
  let serviceMock;
  beforeEach(async () => {
    serviceMock = {
      execute: jest.fn().mockResolvedValue(undefined)
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteShadowController],
      providers: [
        {
          provide: DeleteShadowService,
          useValue: serviceMock,
        }
      ]
    }).compile();

    controller = module.get<DeleteShadowController>(DeleteShadowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(typeof controller.execute).toBe('function');
  });
  it('Should return a success response', async () => {
    const result = await controller.execute('');
    expect(serviceMock.execute).toHaveBeenCalled();
    expect(result.statusCode).toBe(204);
    expect(result.message).toContain(' has been ');
  })
  it('Should return an error response', async () => {
    const errorMock = new Error('Service error');
    serviceMock.execute.mockRejectedValue(errorMock);
    const result = await controller.execute('');
    expect(result.statusCode).toBe(500);
  })

});
