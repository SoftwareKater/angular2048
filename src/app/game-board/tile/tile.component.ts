import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent implements OnInit {
  @Input() public set num(value: number) {
    if (value > 0) {
      this.empty = false;
      this.numField = value;
      this.bgColor = this.getBackgroundColor(value);
    } else {
      this.empty = true;
      this.numField = 0;
      this.bgColor = 'white';
    }
  }
  public get num() {
    return this.numField;
  }

  public bgColor: string;

  public empty: boolean;

  private numField: number;

  private numToColorMap = {
    2: '#eeee00',
    4: '#cccc00',
    8: '#aaaa00',
    16: '#888800',
    32: '#666600',
  };

  constructor() {}

  ngOnInit(): void {}

  public getBackgroundColor(num: number) {
    return this.numToColorMap[num];
  }
}
