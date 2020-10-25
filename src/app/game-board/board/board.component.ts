import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlayerMove } from 'src/app/definitions/player-move.interface';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() set move(value: PlayerMove) {
    if (!value) {
      return;
    }
    const direct = value.direction;
    this.tiles = this.boardService.onMove(this.tiles, direct);
  }

  public set tiles(value: number[]) {
    this.tilesField = value;
    this.score.emit(this.tilesField.reduce((a, b) => a + b));
  }

  public get tiles() {
    return this.tilesField;
  }

  @Output() public score = new EventEmitter<number>();

  private tilesField: number[];

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.tiles = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.initialize();
  }

  public initialize() {
    this.tiles = this.boardService.initializeBoard(this.tiles);
  }
}
