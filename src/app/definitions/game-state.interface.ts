import { GameBoardState } from './game-board-state.interface';

export interface GameState {
  gameBoard: GameBoardState;
  score: number;
  highscore: number;
}
