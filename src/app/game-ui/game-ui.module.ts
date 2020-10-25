import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardControlsComponent } from './board-controls/board-controls.component';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { GameControlsComponent } from './game-controls/game-controls.component';
import { ScoresComponent } from './scores/scores.component';

@NgModule({
  declarations: [BoardControlsComponent, GameControlsComponent, ScoresComponent],
  exports: [BoardControlsComponent, GameControlsComponent, ScoresComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
})
export class GameUiModule {}
