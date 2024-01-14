import { Injectable } from '@angular/core';
import { socketConnection } from '../../fake.socket';
import { RequestMessageKindEnum } from '../../types/request-message-kind.enum';

@Injectable()
export class FakeSocketRequesterFacade {
  private connection = socketConnection();
  constructor() { }

  /** @param {number} time - in ms. */
  changeNodesReceivingTime(time: number) {
    this.connection.sendMessage(RequestMessageKindEnum.ColorNodeFrequency, time);
  }

  changeNodesAmount(amount: number) {
    this.connection.sendMessage(RequestMessageKindEnum.ColorNodeSize, amount);
  }
}
