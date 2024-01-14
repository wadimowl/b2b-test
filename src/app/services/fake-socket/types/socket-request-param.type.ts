import { RequestMessageKindEnum } from './request-message-kind.enum';

export type SocketRequestParam<T extends RequestMessageKindEnum> =
  T extends RequestMessageKindEnum.Connected ? undefined :
  T extends RequestMessageKindEnum.ColorNodeSize ? number :
  T extends RequestMessageKindEnum.ColorNodeFrequency ? number :
    never;
