import {InvoiceResponse} from "../DTO/InvoiceResponse";
import {IUseCase} from "../../../common/Application/IUseCase";
import {InvoiceSearchQuery} from "../Queries/InvoiceSearchQuery";
import {InvoiceSearchDAO} from "../../Model/DAO/InvoiceSearchDAO";


export class InvoiceSearch implements IUseCase<
  InvoiceSearchQuery,
  InvoiceResponse[]
> {
  constructor(private persistence: InvoiceSearchDAO) {}

  execute(request: InvoiceSearchQuery): Promise<InvoiceResponse[]> {
    return this.persistence.search(request);
  }
}
