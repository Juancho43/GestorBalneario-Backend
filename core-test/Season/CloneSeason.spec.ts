import { CloneSeason } from '../../core/Season/Application/UseCase/CloneSeason';
import { CloneSeasonCommand } from '../../core/Season/Application/Commads/CloneSeasonCommand';
import { SeasonShadowsServicesDTO } from '../../core/Season/Application/DTO/SeasonShadowsServicesDTO';
import { CloneSeasonDTO } from '../../core/Season/Application/DTO/CloneSeasonDTO';
import { vi } from 'vitest';
import { SeasonMother } from '../mothers/SeasonMother';
import { Service } from '../../core/Service/Model/Service';
import { Shadow } from '../../core/Shadow/Model/Shadow';
import { ServiceMother } from '../mothers/ServiceMother';
import { ShadowMother } from '../mothers/ShadowMother';
import { CreateSeasonCommand } from '../../core/Season/Application/Commads/CreateSeasonCommand';

describe('CloneSeason UseCase', () => {
  let mockDao;
  let useCase: CloneSeason;
  let command: CloneSeasonCommand;
  let mockGetData;
  let dataDto: SeasonShadowsServicesDTO;
  let cloneDto: CloneSeasonDTO;

  beforeEach(() => {
    const services: Service[] = [];
    const shadows: Shadow[] = [];

    for (let i = 0; i < 3; i++) {
      services.push(ServiceMother.create());
      shadows.push(ShadowMother.create());
    }

    dataDto = {
      season: SeasonMother.create(),
      shadows: shadows,
      services: services,
    };
    cloneDto = new CloneSeasonDTO(dataDto.season, shadows, services);
    mockDao = {
      save: vi.fn().mockResolvedValue(undefined),
    };
    mockGetData = {
      get: vi.fn().mockResolvedValue(dataDto),
    };
    useCase = new CloneSeason(mockDao, mockGetData);
    command = new CloneSeasonCommand(
      new CreateSeasonCommand(
        new Date().toISOString(),
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        'New Season',
        false,
      ),
      dataDto.season.id.value,
    );
  });
  it('Should be defined', () => {
    expect(useCase).toBeDefined();
  });
  it('Should be able to clone a season', async () => {
    await useCase.execute(command);
    expect(mockGetData.get).toHaveBeenCalledWith(command.oldSeasonId);
    expect(mockDao.save).toHaveBeenCalled();
  });
});
