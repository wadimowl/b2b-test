/// <reference lib="webworker" />

import { ResponseMessageKindEnum } from './types/response-message-kind.enum';
import { environment } from '../../../environments/environment';
import { uniqueId } from '../../lib/unique-id';
import { randomHexColor } from '../../lib/random-hex-color';
import { SocketRequest } from './types/socket-request.interface';
import { RequestMessageKindEnum } from './types/request-message-kind.enum';
import { MessageWithColorNode, ProtoColorNodeWithData } from '../../../protobuffs';

let intervalIndex: null | number = 0;
let amount = environment.colorNodesAmount;
let frequency = environment.frequency;

addEventListener('message', (event: MessageEvent<SocketRequest<RequestMessageKindEnum>>) => {
  const message = event.data;
  if (message.kind === RequestMessageKindEnum.ColorNodeSize) {
    amount = (message as SocketRequest<RequestMessageKindEnum.ColorNodeSize>).data;
  }
  if (message.kind === RequestMessageKindEnum.ColorNodeFrequency) {
    frequency = (message as SocketRequest<RequestMessageKindEnum.ColorNodeFrequency>).data;
  }
  if (intervalIndex !== null) {
    clearInterval(intervalIndex);
  }
  const nodes = Array(amount);
  for (let i = 0; i < nodes.length; i++) {
    nodes[i] = new ProtoColorNodeWithData();
  }
  function run() {
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      node.id = uniqueId();
      node.float = +Number(Math.random()).toFixed(18);
      node.int = Math.floor(Math.random() * 10000);
      node.color = randomHexColor();
      node.child = { id: uniqueId(), color: randomHexColor() };
    }
    const message = new MessageWithColorNode({ kind: ResponseMessageKindEnum.ColorNodes, data: nodes });
    const buffer = MessageWithColorNode.encode(message).finish();
    postMessage({ buffer });
  }

  intervalIndex = (setInterval as WorkerGlobalScope['setInterval'])((run.bind(this)), frequency);
  /** run immediately */
  run();
});


