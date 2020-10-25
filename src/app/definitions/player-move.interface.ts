import { Direction } from './direction.type';

export interface PlayerMove {
  round?: number;
  direction: Direction;
}
