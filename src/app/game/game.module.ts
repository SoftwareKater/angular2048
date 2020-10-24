import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { GameUiModule } from '../game-ui/game-ui.module';
import { GameBoardModule } from '../game-board/game-board.module';



@NgModule({
  declarations: [GameComponent],
  exports: [GameComponent],
  imports: [
    CommonModule,
    GameBoardModule,
    GameUiModule,
  ]
})
export class GameModule { }
