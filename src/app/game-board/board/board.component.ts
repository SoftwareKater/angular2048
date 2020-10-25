import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Direction } from 'src/app/definitions/direction.type';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() set move(value: Direction) {
    if (!value) {
      return;
    }
    this.tiles = this.boardService.onMove(this.tiles, value);
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
    this.initialize();
  }

  public initialize(
    tiles: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ) {
    this.tiles = this.boardService.initializeBoard(tiles);
  }
}
