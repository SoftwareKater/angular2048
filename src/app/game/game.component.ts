import { Component, OnInit, ViewChild } from '@angular/core';
import { Direction } from '../definitions/direction.type';
import { PlayerMove } from '../definitions/player-move.interface';
import { BoardService } from '../game-board/board.service';
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

  constructor(private readonly boardService: BoardService) {}

  ngOnInit(): void {
    this.round = 0;
  }

  public onDirection($event: Direction) {
    this.round += 1;
    const direction = $event;
    this.playerMove = {
      round: this.round,
      direction,
    };
  }

  public onRefresh($event) {
    this.board.initialize();
  }

  public onScore($event) {
    this.score = $event;
  }

  public onUndo($event) {}
}
