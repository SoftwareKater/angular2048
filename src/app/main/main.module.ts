import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { GameModule } from '../game/game.module';
import { GameUiModule } from '../game-ui/game-ui.module';

@NgModule({
  declarations: [MainComponent],
  exports: [MainComponent],
  imports: [CommonModule, GameModule, GameUiModule],
})
export class MainModule {}
