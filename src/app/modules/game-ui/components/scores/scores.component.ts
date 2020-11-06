import { Component, Input, OnInit } from '@angular/core';
import { ScoreService } from 'src/app/shared/services/score.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss'],
})
export class ScoresComponent {
  public get score() {
    return this.scoreService.score;
  }

  public get highscore() {
    return this.scoreService.highScore;
  }

  constructor(private readonly scoreService: ScoreService) {}
}
