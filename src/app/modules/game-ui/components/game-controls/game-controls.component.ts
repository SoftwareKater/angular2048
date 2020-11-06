import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-controls',
  templateUrl: './game-controls.component.html',
  styleUrls: ['./game-controls.component.scss'],
})
export class GameControlsComponent implements OnInit {
  @Output() refreshClicked = new EventEmitter<boolean>();

  @Output() undoClicked = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  public onRefreshClick() {
    this.refreshClicked.emit(true);
  }

  public onUndoClick() {
    this.undoClicked.emit(true);
  }
}
