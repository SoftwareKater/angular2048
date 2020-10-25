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
    2: '#eede00',
    4: '#cccd00',
    8: '#bbbc00',
    16: '#aaab00',
    32: '#999a00',
    64: '#00eeee',
    128: '#00ddcc',
    256: '#00bbaa',
    512: '#009988',
    1024: '#ee00ee',
    2048: '#dd00cc',
    4096: '#bb00aa',
    8192: '#990088',
    16384: '#aabbaa',
  };

  constructor() {}

  ngOnInit(): void {}

  public getBackgroundColor(num: number) {
    return this.numToColorMap[num] ? this.numToColorMap[num] : '#000';
  }
}
