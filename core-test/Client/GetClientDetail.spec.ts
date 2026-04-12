import { GetClientDetails } from '../../core/Client/Application/UseCase/GetClientDetails';
import { ClientDetailQuery } from '../../core/Client/Application/Queries/ClientDetailQuery';
import { ClientDetailsDTO } from '../../core/Client/Application/DTO/ClientDetailsDTO';
import { ClientMother } from '../mothers/ClientMother';
import { Invoice } from '../../core/Invoice/Model/Invoice';
import { InvoiceMother } from '../mothers/InvoiceMother';
import { ClientResponse } from '../../core/Client/Application/DTO/ClientResponse';
import { InvoiceResponse } from '../../core/Invoice/Application/DTO/InvoiceResponse';
import { vi } from 'vitest';
describe('GetClientDetail UseCase', () => {
  let mockDao;
  let useCase: GetClientDetails;
  let query: ClientDetailQuery;
  let dto: ClientDetailsDTO;

  beforeEach(() => {
    const invoices: Invoice[] = [];
    const client = ClientMother.create();
    for (let i = 0; i < 3; i++) {
      invoices.push(InvoiceMother.create());
      client.addInvoice(invoices[i]);
    }
    dto = new ClientDetailsDTO();
    dto.client = ClientResponse.create(client);
    dto.invoices = InvoiceResponse.createList(invoices);
    mockDao = {
      get: vi.fn().mockResolvedValue(dto),
    };
    useCase = new GetClientDetails(mockDao);
    query = new ClientDetailQuery(0, 10, client.id.value);
  });
  it('Should be defined', () => {
    expect(useCase).toBeDefined();
  });
  it('Should return client details', async () => {
    const result = await useCase.execute(query);
    expect(result).toEqual(dto);
    expect(mockDao.get).toHaveBeenCalledWith(query);
  });
});
