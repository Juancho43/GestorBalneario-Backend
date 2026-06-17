import {Client} from "../../core/Client/Model/Client";
import {Service} from "../../core/Service/Model/Service";
import {Invoice} from "../../core/Invoice/Model/Invoice";
import {ClientMother} from "../mothers/ClientMother";
import {ServiceMother} from "../mothers/ServiceMother";
import {InvoiceMother} from "../mothers/InvoiceMother";
import {vi} from "vitest";
import {UpdateInvoiceItemCommand} from "../../core/Invoice/Application/Commands/UpdateInvoiceItemCommand";
import {UpdateInvoiceItem} from "../../core/Invoice/Application/UseCase/UpdateInvoiceItem";
import {CreateInvoiceItem} from "../../core/Invoice/Application/UseCase/CreateInvoiceItem";
import {InvoiceItem} from "../../core/Invoice/Model/InvoiceItem";
import {EntityNotFoundError} from "../../core/common/Model/Errors/EntityNotFound";

describe('UpdateInvoiceItem UseCase', () => {
    let mockEventPublisher;
    let mockGetServiceDAO;
    let mockCreateItemDAO;
    let mockClientInvoicesDAO;
    let useCase: UpdateInvoiceItem;
    let client: Client;
    let service: Service;
    let invoice: Invoice;
    let item: InvoiceItem;
    let command: UpdateInvoiceItemCommand;
    beforeEach(() => {
        client = ClientMother.create();
        service = ServiceMother.create();
        invoice = InvoiceMother.create();
        client.addInvoice(invoice);

        item = CreateInvoiceItem.create('DISCOUNT',10,'Client Vip',service.id.value,service.id.value,invoice.id.value);
        invoice.addItem(item);
        mockEventPublisher = {
            publish: vi.fn().mockResolvedValue(undefined),
        };
        mockCreateItemDAO = {
            update: vi.fn().mockResolvedValue(undefined),
        };
        mockClientInvoicesDAO = {
            get: vi.fn().mockResolvedValue(invoice),
        };
        mockGetServiceDAO = {
            get: vi.fn().mockResolvedValue(service),
        };
        command = new UpdateInvoiceItemCommand(
            item.getId().value,
           client.id.value,
            service.id.value,
            service.price.amount,
            'DISCOUNT',
            1,
            'Service',
        );
        useCase = new UpdateInvoiceItem(
            mockClientInvoicesDAO,
            mockGetServiceDAO,
            mockCreateItemDAO,
            mockEventPublisher,
        );
    });
    afterEach(() => {
        vi.fn().mockClear();
    });

    it('should be created', () => {
        expect(useCase).toBeDefined();
        expect(useCase).toBeInstanceOf(UpdateInvoiceItem);
    });

    it('Should update an item invoice and publish event', async () => {
        await useCase.execute(command);
        expect(mockGetServiceDAO.get).toHaveBeenCalledWith(command.serviceId);
        expect(mockClientInvoicesDAO.get).toHaveBeenCalledWith(command.invoiceId);
        expect(mockCreateItemDAO.update).toHaveBeenCalled();
        expect(mockEventPublisher.publish).toHaveBeenCalled();
    });
    it('Should fail if dont find service ', async () => {
        mockGetServiceDAO.get.mockResolvedValue(null);
        await expect(useCase.execute(command)).rejects.toThrow(EntityNotFoundError);
    });
    it('Should fail if dont find client ', async () => {
        mockClientInvoicesDAO.get.mockResolvedValue(null);
        await expect(useCase.execute(command)).rejects.toThrow(EntityNotFoundError);
    });
})