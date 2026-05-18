import {EntityNotFoundError} from '../../../../common/Model/Errors/EntityNotFound';
import {Service} from '../../../Model/Service';
import {GetServiceDAO} from '../../../Model/DAO/GetServiceDAO';
import {UpdateServiceDAO} from '../../../Model/DAO/UpdateServiceDAO';
import {IUseCase} from '../../../../common/Application/IUseCase';
import {UpdateServiceCommand} from '../../Commands/UpdateServiceCommand';
import {Money} from '../../../../Payment/Model/Money';
import {StringObject} from '../../../../common/Model/StringObject';
import {ServiceCategory} from "../../../Model/ServiceCategory";

export class UpdateService implements IUseCase<UpdateServiceCommand, Service> {
  constructor(
    private readonly updateDao: UpdateServiceDAO,
    private readonly getDao: GetServiceDAO,
  ) {}

  async execute(request: UpdateServiceCommand): Promise<Service> {
    const existingEntity = await this.getDao.get(request.id);
    if (!existingEntity) {
      throw new EntityNotFoundError('Service', request.id);
    }
    existingEntity.update();
    const service = Service.create(
      existingEntity.id,
      existingEntity.seasonId,
      StringObject.create(request.data.name),
      Money.create(request.data.price),
      ServiceCategory.create(request.data.type),
      existingEntity.getTimestamps(),
      existingEntity.getSoftDelete(),
    );
    await this.updateDao.update(service);

    return service;
  }
}
