import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileComponent } from './tile/tile.component';
import { BoardComponent } from './board/board.component';



@NgModule({
  declarations: [TileComponent, BoardComponent],
  imports: [
    CommonModule
  ],
  exports: [BoardComponent]
})
export class GameBoardModule { }
