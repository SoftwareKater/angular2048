import { Injectable } from '@angular/core';
import { GameState } from 'src/app/definitions/game-state.interface';

@Injectable({ providedIn: 'root' })
export class ScoreService {
  public get score() {
    return this.scoreField;
  }
  public set score(value: number) {
    this.oldScore = this.score;
    this.scoreField = value;
    if (value > this.highScore) {
      this.highScore = value;
    }
  }
  public highScore: number;

  private scoreField: number;
  private oldScore: number;

  constructor() {}

  public init(gameState: GameState = null): void {
    if (!gameState) {
      this.score = 0;
      this.oldScore = 0;
      this.highScore = 0;
    } else {
      this.score = gameState.score;
      this.oldScore = gameState.score;
      this.highScore = gameState.highscore;
    }
  }

  public resetScore(): void {
    this.score = this.oldScore;
  }
}
