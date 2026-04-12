import { InvoiceDetails } from '../../core/Invoice/Application/UseCase/InvoiceDetails';
import { InvoiceDetailsDTO } from '../../core/Invoice/Application/DTO/InvoiceDetailsDTO';
import { InvoiceDetailQuery } from '../../core/Invoice/Application/Queries/InvoiceDetailQuery';
import { ClientResponse } from '../../core/Client/Application/DTO/ClientResponse';
import { ClientMother } from '../mothers/ClientMother';
import { InvoiceMother } from '../mothers/InvoiceMother';
import { InvoiceResponse } from '../../core/Invoice/Application/DTO/InvoiceResponse';
import { vi } from 'vitest';

describe('InvoiceDetail UseCase', () => {
  let mockDao;
  let useCase: InvoiceDetails;
  let dto: InvoiceDetailsDTO;
  let query: InvoiceDetailQuery;
  beforeEach(() => {
    const client = ClientResponse.create(ClientMother.create());
    dto = new InvoiceDetailsDTO();
    dto.client = client;
    dto.invoice = InvoiceResponse.create(InvoiceMother.create());
    mockDao = {
      get: vi.fn().mockResolvedValue(dto),
    };
    useCase = new InvoiceDetails(mockDao);
    query = new InvoiceDetailQuery(dto.invoice.id);
  });
  it('Should be defined', () => {
    expect(useCase).toBeDefined();
  });
  it('Should return invoice details', async () => {
    const result = await useCase.execute(query);
    expect(result).toEqual(dto);
    expect(mockDao.get).toHaveBeenCalledWith(query);
  });
});
