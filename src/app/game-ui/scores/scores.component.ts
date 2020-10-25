import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss'],
})
export class ScoresComponent {
  @Input() public set score(value: number) {
    this.scoreField = value;
    if (value > this.highscore) {
      this.highscore = value;
    }
  }

  public get score() {
    return this.scoreField;
  }

  public highscore = -1;

  private scoreField: number;

  constructor() {
    this.score = 0;
  }
}
