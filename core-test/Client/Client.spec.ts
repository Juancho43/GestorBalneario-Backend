import { Client } from '../../core/Client/Model/Client';
import { Invoice } from '../../core/Invoice/Model/Invoice';
import { ClientMother } from '../mothers/ClientMother';
import { InvoiceMother } from '../mothers/InvoiceMother';

describe('Client Domanin Entity', () => {
  let client: Client;
  let invoices: Invoice[] = [];
  beforeEach(() => {
    client = ClientMother.create();
  });

  it('Should be created', () => {
    expect(client).toBeDefined();
  });
  it('Should get last issued invoice', () => {
    for (let i = 0; i < 3; i++) {
      const invoice = InvoiceMother.create();
      invoices.push(invoice);
      client.addInvoice(invoice);
    }
    expect(client.getLastInvoice()).toEqual(invoices[0]);
  });
  it('Should create active invoice', () => {
    const invoice = client.getOrCreateActiveInvoice();
    expect(invoice).toBeInstanceOf(Invoice);
    expect(client.getLastInvoice()).toEqual(invoice);
  });
});
