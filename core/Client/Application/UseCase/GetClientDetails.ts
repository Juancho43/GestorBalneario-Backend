import { ClientDetailsDTO } from '../DTO/ClientDetailsDTO';
import { ClientDetailsDAO } from '../Interfaces/ClientDetailsDAO';
import { IUseCase } from '../../../common/Application/IUseCase';
import { ClientDetailQuery } from '../Queries/ClientDetailQuery';

export class GetClientDetails implements IUseCase<
  ClientDetailQuery,
  ClientDetailsDTO
> {
  constructor(private persistence: ClientDetailsDAO) {}

  execute(request: ClientDetailQuery): Promise<ClientDetailsDTO> {
    return this.persistence.get(request);
  }
}
