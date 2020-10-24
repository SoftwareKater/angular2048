import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-board-controls',
  templateUrl: './board-controls.component.html',
  styleUrls: ['./board-controls.component.scss'],
})
export class BoardControlsComponent implements OnInit {
  @Output() direction = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  public onUpClick() {
    this.direction.emit('up');
  }

  public onDownClick() {
    this.direction.emit('down');
  }

  public onLeftClick() {
    this.direction.emit('left');
  }

  public onRightClick() {
    this.direction.emit('right');
  }
}
