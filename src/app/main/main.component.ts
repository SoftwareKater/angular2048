import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public staging: boolean;

  constructor() {}

  ngOnInit(): void {
    this.staging = window.location.origin.toLowerCase().search('staging') > 0;
  }
}
