import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-controls',
  templateUrl: './game-controls.component.html',
  styleUrls: ['./game-controls.component.scss'],
})
export class GameControlsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public onRefreshClick() {
    console.log('hit F5 for now');
  }

  public onUndoClick() {
    console.log('undoing your last move is not implemented yet.');
  }
}
