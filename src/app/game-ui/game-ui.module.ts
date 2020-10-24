import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardControlsComponent } from './board-controls/board-controls.component';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [BoardControlsComponent],
  exports: [BoardControlsComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
})
export class GameUiModule {}
