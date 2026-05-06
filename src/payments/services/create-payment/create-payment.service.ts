import {Inject, Injectable, Logger} from '@nestjs/common';
import {ProcessPayment} from '../../../../core/Payment/Application/UseCase/ProcessPayment';
import {CreatePaymentCommand} from '../../../../core/Payment/Application/Command/CreatePaymentCommand';
import {PAYMENT_TOKEN} from '../../PAYMENT_TOKEN';

@Injectable()
export class CreatePaymentService {
  private logger = new Logger(CreatePaymentService.name);
  constructor(
    @Inject(PAYMENT_TOKEN.USECASE.CREATE_PAYMENT)
    private useCase: ProcessPayment,
  ) {}

  async execute(command: CreatePaymentCommand) {
    try {
      this.logger.debug('Creating payment');
      return await this.useCase.execute(command);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
