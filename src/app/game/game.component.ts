import { Component, OnInit, ViewChild } from '@angular/core';
import { Direction } from '../definitions/direction.type';
import { PlayerMove } from '../definitions/player-move.interface';
import { BoardComponent } from '../game-board/board/board.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @ViewChild('board') private board: BoardComponent;

  public round: number;

  public playerMove: PlayerMove;

  public score: number;

  constructor() {}

  ngOnInit(): void {
    this.round = 0;
  }

  public onDirection($event: PlayerMove) {
    this.round += 1;
    this.playerMove = {
      round: this.round,
      direction: $event.direction,
    };
  }

  public onRefresh($event) {
    this.board.initialize();
  }

  public onScore($event) {
    this.score = $event;
  }

  public onUndo($event) {
    this.board.undo();
  }
}
