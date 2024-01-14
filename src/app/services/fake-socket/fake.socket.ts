import { map, Observable, Subject } from 'rxjs';
import { RequestMessageKindEnum } from './types/request-message-kind.enum'
import { SocketRequestParam } from './types/socket-request-param.type';
import { SocketRequest } from './types/socket-request.interface';
import { MessageWithColorNode } from '../../../protobuffs';

class FakeSocket {
  private worker: Worker | null = null;
  private readonly data$ = new Subject<Uint8Array>();

  constructor() {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('./app.worker', import.meta.url));
      this.worker.onmessage = ({ data }) => {
        this.data$.next(data);
      };
      this.sendMessage(RequestMessageKindEnum.Connected);
    } else {
      throw 'Web Worker is not supported.'
    }
  }

  sendMessage<T extends RequestMessageKindEnum>(kind: T, data?: SocketRequestParam<T>) {
    this.worker?.postMessage({ kind, data } as SocketRequest<T>);
  }

  dataProvider(): Observable<MessageWithColorNode['data']> {
    return this.data$.pipe(map((data) => {
      return MessageWithColorNode.decode(new Uint8Array(data.buffer));
    }), map(({ data }) => data));
  }
}

let instance: FakeSocket | null = null;
export function socketConnection() {
  if (!instance) {
    instance = new FakeSocket();
  }
  return instance;
}
