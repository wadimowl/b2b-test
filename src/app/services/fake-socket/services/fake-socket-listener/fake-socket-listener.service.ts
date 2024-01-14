import { Injectable } from '@angular/core';
import { socketConnection } from '../../fake.socket';
import { Observable } from 'rxjs';
import { ProtoColorNodeWithData } from '../../../../../protobuffs';

@Injectable()
export class FakeSocketListenerService {
  private connection = socketConnection();

  colorsNodesMessages(): Observable<ProtoColorNodeWithData[]> {
    return this.connection.dataProvider();
  }
}
