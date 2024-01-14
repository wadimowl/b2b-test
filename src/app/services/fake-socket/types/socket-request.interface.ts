import { RequestMessageKindEnum } from './request-message-kind.enum';
import { SocketRequestParam } from './socket-request-param.type';

export interface SocketRequest<T extends RequestMessageKindEnum> {
  kind: T;
  data: SocketRequestParam<T>;
}
