import { Type, Field, Message, Enum } from 'protobufjs/light'
import { uniqueId } from './app/lib/unique-id';
import { randomHexColor } from './app/lib/random-hex-color';
import { ResponseMessageKindEnum } from './app/services/fake-socket/types/response-message-kind.enum';
import { ColorNode } from './app/services/fake-socket/types/color-node';
import { ColorNodeWithData } from './app/services/fake-socket/types/color-node-with-data';

// id: uniqueId(),
// float: +Number(Math.random()).toFixed(18),
// int: Math.floor(Math.random() * 10000),
// color: randomHexColor(),
// child: { id: uniqueId(), color: randomHexColor() }

// { kind: ResponseMessageKindEnum.ColorNodes, data: nodes }

// export const ColorNode = new Type('ColorNode')
//   .add(new Field('id', 1, 'string'))
//   .add(new Field('float', 2, 'float'))
//   .add(new Field('int', 3, 'int64'))
//   .add(new Field('color', 4, 'string'));

@Type.d('ProtoColorNode')
export class ProtoColorNode extends Message<ProtoColorNode> {
  @Field.d(1, "string", 'required')
  public id!: ColorNode['id'];

  @Field.d(2, "string", 'required')
  public color!: ColorNode['color'];
}

@Type.d('ProtoColorNodeWithData')
export class ProtoColorNodeWithData extends Message<ProtoColorNodeWithData> {
  @Field.d(1, "string", 'required')
  public id!: ColorNodeWithData['id'];

  @Field.d(2, "double", 'required')
  public float!: ColorNodeWithData['float'];

  @Field.d(3, "int64", 'required')
  public int!: ColorNodeWithData['int'];

  @Field.d(4, "string", 'required')
  public color!: ColorNodeWithData['color'];

  @Field.d(5, ProtoColorNode)
  public child!: ColorNodeWithData['child'];
}

@Type.d('MessageWithColorNode')
export class MessageWithColorNode extends Message<MessageWithColorNode> {
  @Field.d(1, ResponseMessageKindEnum)
  public kind!: ResponseMessageKindEnum;

  @Field.d(2, ProtoColorNodeWithData, 'repeated')
  public data!: ProtoColorNodeWithData[];
}

