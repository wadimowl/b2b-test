import { HexColor } from '../services/fake-socket/types/hex-color';
const MAX_HEX_VALUE = 256**3;

export function randomHexColor(): HexColor {
  return `#${Math.floor(Math.random() * MAX_HEX_VALUE).toString(16)}`;
}
