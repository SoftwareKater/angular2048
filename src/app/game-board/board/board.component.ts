import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Direction } from 'src/app/definitions/direction.type';
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
    this.oldTilesField = this.tiles;
    this.tiles = this.boardService.onMove(this.tiles, value.direction);
    if (this.boardService.checkGameOver(this.tiles)) {
      this.displayGameOver = '';
    }
  }

  @Output() public score = new EventEmitter<number>();

  public set tiles(value: number[]) {
    this.tilesField = value;
    this.score.emit(this.tilesField.reduce((a, b) => a + b));
  }

  public get tiles() {
    return this.tilesField;
  }

  public displayGameOver = 'None';

  private tilesField: number[];

  private oldTilesField: number[];

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.initialize();
  }

  public initialize(
    tiles: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ) {
    this.tiles = this.boardService.initializeBoard(tiles);
  }

  public undo() {
    this.tiles = this.oldTilesField;
  }

  public onPanStart($event) {
    document.getElementsByTagName('body').item(0).style.pointerEvents = 'none';
    document.getElementsByTagName('body').item(0).style.touchAction = 'none';
  }

  public onPanEnd($event) {
    document.getElementsByTagName('body').item(0).style.pointerEvents = '';
    document.getElementsByTagName('body').item(0).style.touchAction = '';
  }

  public onSwipeLeft($event) {
    this.move = {direction: 'left'};
  }
  public onSwipeRight($event) {
    this.move = {direction: 'right'};
  }
  public onSwipeUp($event) {
    this.move = {direction: 'up'};
  }
  public onSwipeDown($event) {
    this.move = {direction: 'down'};
  }
}
