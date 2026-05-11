import {IUseCase} from "../../../common/Application/IUseCase";
import {PaymentMethod} from "../../Model/PaymentType";

export class GetPaymentTypes implements IUseCase<undefined,string[]> {
    execute(_request: undefined): Promise<string[]> {
        return Promise.resolve(Object.values(PaymentMethod));
    }
}