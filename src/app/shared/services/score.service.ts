import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScoreService {
  public get score() {
    return this._score;
  }
  public set score(value: number) {
    this.oldScore = this.score;
    this._score = value;
    if (value > this.highScore) {
      this.highScore = value;
    }
  }
  public highScore = 0;

  private _score = 0;
  private oldScore = 0;

  constructor() {}

  public init(): void {
    this.score = 0;
    this.oldScore = 0;
  }

  public resetScore(): void {
    this.score = this.oldScore;
  }
}
