import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GameState } from '../definitions/game-state.interface';
import { PlayerMove } from '../definitions/player-move.interface';
import { BoardComponent } from '../game-board/board/board.component';
import { GameStateStorageService } from '../shared/services/game-state-storage.service';
import { ScoreService } from '../shared/services/score.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, AfterViewInit {
  @ViewChild('board') private board: BoardComponent;

  public round: number;

  public playerMove: PlayerMove;

  constructor(
    private readonly storageService: GameStateStorageService,
    private readonly scoreService: ScoreService
  ) {}

  ngOnInit(): void {
    this.round = 0;
    this.scoreService.init(this.storageService.get());
  }

  ngAfterViewInit(): void {
    const recoverState = this.storageService.get();
    this.board.initialize(recoverState);
  }

  public onDirection($event: PlayerMove) {
    this.round += 1;
    this.playerMove = {
      round: this.round,
      direction: $event.direction,
    };
    this.updateState();
  }

  public onRefresh($event) {
    this.round = 0;
    this.board.initialize();
    this.scoreService.init();
    this.board.displayGameOver = 'none';
    this.updateState();
  }

  public onUndo($event) {
    this.scoreService.resetScore();
    this.board.undo();
    this.updateState();
  }

  private updateState() {
    const newState: GameState = {
      gameBoard: {
        size: 4,
        tiles: this.board.tiles,
      },
      score: this.scoreService.score,
      highscore: this.scoreService.highScore,
    };
    console.log(newState);
    this.storageService.set(newState);
  }
}
