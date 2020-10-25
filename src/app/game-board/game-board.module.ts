import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileComponent } from './tile/tile.component';
import { BoardComponent } from './board/board.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { BoardService } from './board.service';

@NgModule({
  declarations: [BoardComponent, TileComponent],
  exports: [BoardComponent],
  providers: [BoardService],
  imports: [CommonModule, MatGridListModule],
})
export class GameBoardModule {}
