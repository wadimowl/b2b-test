import { ColorNode } from './color-node';

export interface ColorNodeWithData extends ColorNode {
  int: number;
  float: number; // precision 18 symbols after dot
  child: ColorNode;
}
