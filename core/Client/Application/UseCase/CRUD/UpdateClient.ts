import {IUseCase} from '../../../../common/Application/IUseCase';
import {UpdateClientCommand} from '../../Commands/UpdateClientCommand';
import {Client} from '../../../Model/Client';
import {UpdateClientDAO} from '../../../Model/DAO/UpdateClientDAO';
import {StringObject} from '../../../../common/Model/StringObject';
import {EmailObject} from '../../../../common/Model/EmailObject';
import {EntityNotFoundError} from '../../../../common/Model/Errors/EntityNotFound';
import {GetClientDAO} from '../../../Model/DAO/GetClientDAO';

export class UpdateClient implements IUseCase<UpdateClientCommand, Client> {
  constructor(
    private readonly updateDao: UpdateClientDAO,
    private readonly getDao: GetClientDAO,
  ) {}

  async execute(request: UpdateClientCommand): Promise<Client> {
    const existingEntity = await this.getDao.get(request.id);
    if (!existingEntity) {
      throw new EntityNotFoundError('Client', request.id);
    }
    existingEntity.update();
    const client = Client.create(
      existingEntity.getId(),
      StringObject.create(request.data.name),
      EmailObject.create(request.data.email),
      StringObject.create(request.data.phone),
      existingEntity.getTimestamps(),
      existingEntity.getSoftDelete(),
    );

    await this.updateDao.update(client);

    return existingEntity;
  }
}
