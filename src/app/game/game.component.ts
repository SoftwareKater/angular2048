import { Component, OnInit } from '@angular/core';
import { Direction } from '../types/direction.type';
import { PlayerMove } from '../types/player-move.interface';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  public round: number;
  public playerMove: PlayerMove;

  constructor() {}

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
}
