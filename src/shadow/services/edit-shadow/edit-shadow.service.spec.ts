import { Test, TestingModule } from '@nestjs/testing';
import { EditShadowService } from './edit-shadow.service';

describe('EditShadowService', () => {
  let service: EditShadowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EditShadowService],
    }).compile();

    service = module.get<EditShadowService>(EditShadowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
