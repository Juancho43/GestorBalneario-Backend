import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {DeleteInvoiceItem} from "../../core/Invoice/Application/UseCase/DeleteInvoiceItem";
import {DeleteInvoiceItemCommand} from "../../core/Invoice/Application/Commands/DeleteInvoiceItemCommand";
import {InvoiceMother} from "../mothers/InvoiceMother";
import {EntityNotFoundError} from "../../core/common/Model/Errors/EntityNotFound";

describe('DeleteInvoiceItem UseCase', () => {
   let mockEventPublisher: any;
   let mockGetInvoiceDAO: any;
   let mockDeleteDAO: any;

   let useCase: DeleteInvoiceItem;
   let invoice: any;
   let command: DeleteInvoiceItemCommand;

   beforeEach(() => {
      invoice = InvoiceMother.create();
      invoice.deleteInvoiceItem = vi.fn();

      mockEventPublisher = {
         publish: vi.fn().mockResolvedValue(undefined),
      };
      mockGetInvoiceDAO = {
         get: vi.fn().mockResolvedValue(invoice),
      };
      mockDeleteDAO = {
         delete: vi.fn().mockResolvedValue(undefined),
      };

      const fakeItemId = '123e4567-e89b-12d3-a456-426614174000'; // Standard UUID format
      command = new DeleteInvoiceItemCommand(
          fakeItemId,
          invoice.id.value
      );

      useCase = new DeleteInvoiceItem(
          mockGetInvoiceDAO,
          mockDeleteDAO,
          mockEventPublisher
      );
   });

   afterEach(() => {
      vi.clearAllMocks();
   });

   it('should be created', () => {
      expect(useCase).toBeDefined();
      expect(useCase).toBeInstanceOf(DeleteInvoiceItem);
   });

   it('Should delete an item from the invoice, persist it, and publish the event', async () => {
      await useCase.execute(command);

      expect(mockGetInvoiceDAO.get).toHaveBeenCalledWith(command.invoiceId);
      expect(invoice.deleteInvoiceItem).toHaveBeenCalled();
      expect(mockDeleteDAO.delete).toHaveBeenCalled();
      expect(mockEventPublisher.publish).toHaveBeenCalled();
   });

   it('Should throw an EntityNotFoundError if the invoice does not exist', async () => {
      mockGetInvoiceDAO.get.mockResolvedValue(null);

      await expect(useCase.execute(command)).rejects.toThrow(EntityNotFoundError);

      expect(invoice.deleteInvoiceItem).not.toHaveBeenCalled();
      expect(mockDeleteDAO.delete).not.toHaveBeenCalled();
      expect(mockEventPublisher.publish).not.toHaveBeenCalled();
   });
});