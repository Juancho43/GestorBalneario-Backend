import {Test, TestingModule} from '@nestjs/testing';
import {CloneSeasonController} from './clone-season.controller';
import {CloneSeasonService} from "../../services/clone-season/clone-season.service";

describe('CloneSeasonController', () => {
  let controller: CloneSeasonController;
  let serviceMock;
  let command;
  beforeEach(async () => {
  serviceMock= {
    execute: jest.fn().mockResolvedValue(undefined)
  }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CloneSeasonController],
      providers: [{
        provide: CloneSeasonService,
        useValue:serviceMock
      }]
    }).compile();

    controller = module.get<CloneSeasonController>(CloneSeasonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should execute', async () => {
    const result = await controller.execute(command);

    expect(serviceMock.execute).toHaveBeenCalledWith(command);
    expect(result.statusCode).toBe(201);
    expect(result.message).toContain('has been cloned');
  });
});
