import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BoardControlsComponent } from './components/board-controls/board-controls.component';
import { GameControlsComponent } from './components/game-controls/game-controls.component';
import { ScoresComponent } from './components/scores/scores.component';

@NgModule({
  declarations: [
    BoardControlsComponent,
    GameControlsComponent,
    ScoresComponent,
  ],
  exports: [BoardControlsComponent, GameControlsComponent, ScoresComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
})
export class GameUiModule {}
