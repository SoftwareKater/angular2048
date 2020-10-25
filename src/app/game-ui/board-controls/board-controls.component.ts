import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlayerMove } from 'src/app/definitions/player-move.interface';

@Component({
  selector: 'app-board-controls',
  templateUrl: './board-controls.component.html',
  styleUrls: ['./board-controls.component.scss'],
})
export class BoardControlsComponent implements OnInit {
  @Output() direction = new EventEmitter<PlayerMove>();

  constructor() {}

  ngOnInit(): void {}

  public onUpClick() {
    this.direction.emit({direction: 'up'});
  }

  public onDownClick() {
    this.direction.emit({direction: 'down'});
  }

  public onLeftClick() {
    this.direction.emit({direction: 'left'});
  }

  public onRightClick() {
    this.direction.emit({direction: 'right'});
  }
}
