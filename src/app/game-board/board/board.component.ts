import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() set move(value: 'up' | 'down' | 'left' | 'right') {
    this.boardService.onMove(this.tiles, value);
  }

  public tiles: any[];

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.tiles = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.initialize();
  }

  public initialize() {
    const init = this.boardService.initializeBoard(this.tiles.length);
    this.tiles[init[0]] = init[1];
  }
}
