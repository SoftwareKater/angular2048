import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { PlayerMove } from 'src/app/definitions/player-move.interface';
import { ScoreService } from 'src/app/shared/services/score.service';
import { GameBoardService } from '../game-board.service';

export enum KeyCode {
  ArrowUp = 'ArrowUp',
  ArrowLeft = 'ArrowLeft',
  ArrowDown = 'ArrowDown',
  ArrowRight = 'ArrowRight',
}

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

  public set tiles(value: number[]) {
    this.tilesField = value;
  }

  public get tiles() {
    return this.tilesField;
  }

  public displayGameOver = 'none';

  private tilesField: number[];

  private oldTilesField: number[];

  constructor(private readonly boardService: GameBoardService, private readonly scoreService: ScoreService) {}

  ngOnInit(): void {
    this.initialize();
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    switch (event.key) {
      case KeyCode.ArrowUp:
        this.moveUp(event);
        break;
      case KeyCode.ArrowLeft:
        this.moveLeft(event);
        break;
      case KeyCode.ArrowDown:
        this.moveDown(event);
        break;
      case KeyCode.ArrowRight:
        this.moveRight(event);
        break;
    }
  }

  public initialize(
    tiles: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ) {
    this.tiles = this.boardService.initializeBoard(tiles);
    this.scoreService.init();
    this.oldTilesField = this.tiles;
  }

  public undo() {
    this.tiles = this.oldTilesField;
    this.scoreService.resetScore();
  }

  public onPanStart($event) {
    document.getElementsByTagName('body').item(0).style.pointerEvents = 'none';
    document.getElementsByTagName('body').item(0).style.touchAction = 'none';
  }

  public onPanEnd($event) {
    document.getElementsByTagName('body').item(0).style.pointerEvents = '';
    document.getElementsByTagName('body').item(0).style.touchAction = '';
  }

  public moveUp($event) {
    this.move = { direction: 'up' };
  }

  public moveLeft($event) {
    this.move = { direction: 'left' };
  }

  public moveDown($event) {
    this.move = { direction: 'down' };
  }

  public moveRight($event) {
    this.move = { direction: 'right' };
  }
}
