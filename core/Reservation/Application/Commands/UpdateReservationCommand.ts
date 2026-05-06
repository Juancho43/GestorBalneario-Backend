import {CreateReservationCommand} from './CreateReservationCommand';

export class UpdateReservationCommand {
  /**
   * Id of the reservation to edit:w
   * */
  id: string;
  data: CreateReservationCommand;

  constructor(id: string, data: CreateReservationCommand) {
    this.id = id;
    this.data = data;
  }
}
